"use client";

import { useEffect, useRef } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";
import type { WorkerToHostMessage } from "./protocol";

import { useEffectEvent } from "../hooks";
import { WORKER_SCRIPT } from "./workerScript";

type UseProteusScriptsOptions = {
  /** Current form data — snapshotted per invoke and shipped to the worker. */
  data: Record<string, unknown>;
  /**
   * Re-dispatch an event the running handler emitted. Wired to the shell's
   * `onEvent` so scripts can only trigger the existing Proteus events.
   */
  onEmit: (event: ProteusEventHandler) => Promise<unknown>;
  /** The document's `scripts` map, or undefined when it ships none. */
  scripts: Record<string, string> | undefined;
};

/**
 * How long a single handler run may take before we give up on it. A script
 * with an infinite loop cannot block the main thread (it runs in the worker),
 * but its `invoke` promise would otherwise never resolve — wedging the
 * triggering control in a `loading` state forever. On timeout we resolve the
 * run to `undefined` (the fail-silent default) and terminate the worker so the
 * runaway handler stops burning a core; the next run lazily respawns it.
 */
const INVOKE_TIMEOUT_MS = 5000;

/**
 * Spins up a single sandbox Web Worker for the document's `scripts` and returns
 * a `runScript(handler, params)` that invokes a named handler inside it. Events
 * the handler emits are routed back through `onEmit` (the shell dispatcher) and
 * their results returned to the worker, so `ctx.emit` round-trips work.
 *
 * Returns a no-op runner when the document ships no scripts — no worker is
 * spawned until the first `runScript` call.
 */
export function useProteusScripts({
  data,
  onEmit,
  scripts,
}: UseProteusScriptsOptions) {
  const dataRef = useRef(data);
  dataRef.current = data;

  const emit = useEffectEvent(onEmit);

  const hasScripts = !!scripts && Object.keys(scripts).length > 0;

  // A run in flight: its `resolve` and its timeout handle, keyed by invokeId so
  // a timeout can settle exactly the run it belongs to.
  const pending = useRef(
    new Map<
      number,
      {
        resolve: (value: unknown) => void;
        timer: ReturnType<typeof setTimeout>;
      }
    >(),
  ).current;
  const nextId = useRef(1);
  const workerRef = useRef<null | Worker>(null);

  const spawnWorker = useEffectEvent(() => {
    const url = URL.createObjectURL(
      new Blob([WORKER_SCRIPT], { type: "text/javascript" }),
    );
    const instance = new Worker(url);
    URL.revokeObjectURL(url);
    instance.postMessage({ scripts, type: "init" });

    instance.addEventListener(
      "message",
      async (e: MessageEvent<WorkerToHostMessage>) => {
        const msg = e.data;
        if (msg.type === "emit") {
          const result = await emit(msg.event);
          instance.postMessage({
            emitId: msg.emitId,
            result,
            type: "emitResult",
          });
        } else if (msg.type === "invokeResult") {
          // A failed handler (bad name / thrown) resolves to undefined —
          // matching the non-strict "fail silently" default of the other
          // Proteus ops. The error travels on `msg.error` for future
          // strict-mode surfacing.
          settle(msg.invokeId, msg.result);
        }
      },
    );
    return instance;
  });

  /** Resolve a pending run (if still pending) and clear its timeout. */
  const settle = useEffectEvent((invokeId: number, result: unknown) => {
    const entry = pending.get(invokeId);
    if (!entry) {
      return;
    }
    clearTimeout(entry.timer);
    pending.delete(invokeId);
    entry.resolve(result);
  });

  /** Tear down the current worker and abandon every in-flight run. */
  const teardown = useEffectEvent(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    for (const [invokeId] of pending) {
      settle(invokeId, undefined);
    }
  });

  // Respawn on a new `scripts` map (and dispose the old worker); dispose on
  // unmount. The worker itself is created lazily by `runScript`.
  useEffect(() => {
    teardown();
    return teardown;
  }, [scripts]);

  return useEffectEvent(
    (handler: string, params?: Record<string, unknown>): Promise<unknown> => {
      if (!hasScripts) {
        return Promise.resolve(undefined);
      }
      if (!workerRef.current) {
        workerRef.current = spawnWorker();
      }
      const worker = workerRef.current;
      const invokeId = nextId.current++;
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          // Runaway handler: settle the run and kill the worker so it stops
          // consuming a core. The next run respawns a fresh worker.
          settle(invokeId, undefined);
          teardown();
        }, INVOKE_TIMEOUT_MS);
        pending.set(invokeId, { resolve, timer });
        worker.postMessage({
          data: dataRef.current,
          handler,
          invokeId,
          params: params ?? {},
          type: "invoke",
        });
      });
    },
  );
}
