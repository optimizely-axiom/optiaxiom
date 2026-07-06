"use client";

import { get } from "jsonpointer";
import { useEffect, useRef } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";
import type { WorkerToHostMessage } from "./protocol";

import { useEffectEvent } from "../hooks";
import { WORKER_SCRIPT } from "./workerScript";

type UseProteusScriptsOptions = {
  /** Current form data — snapshotted per invoke and edge-detected for watchers. */
  data: Record<string, unknown>;
  /**
   * Re-dispatch an event a handler or watcher emitted. Wired to the shell's
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
 * a handler or watcher emits are routed back through `onEmit` (the shell
 * dispatcher) and their results returned to the worker, so `ctx.emit`
 * round-trips work.
 *
 * Watchers (`watch(path, fn)` in a script) are driven from here: the worker
 * reports its watched paths after `init`, and this hook edge-detects each path
 * against `data` on every change, posting `runWatcher` when the value there
 * changes. A watcher does NOT re-fire on data changes caused by a script's own
 * `emit` (see `emitDepthRef`) — watchers observe user/host state changes, which
 * both prevents emit→watcher→emit loops and gives a predictable "reacts to what
 * the user did" semantic.
 *
 * Returns a no-op runner when the document ships no scripts — the worker is
 * spawned eagerly when scripts exist (watchers can fire before any interaction).
 */
export function useProteusScripts({
  data,
  onEmit,
  scripts,
}: UseProteusScriptsOptions) {
  const dataRef = useRef(data);
  dataRef.current = data;
  // The data as of mount, used to seed watcher baselines — so a data change the
  // user made before the worker finished registering its watchers still reads as
  // an edge once the watcher subscribes (rather than being silently absorbed).
  const initialDataRef = useRef(data);

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

  // Watcher state: the paths reported by the worker, and the last-evaluated
  // slice at each (serialized) for edge-detection.
  const watchedPaths = useRef<string[]>([]);
  const lastEval = useRef<string[]>([]);
  // >0 while a script-emitted event is being dispatched. Data changes during
  // this window are script-induced, so watchers must not react to them.
  const emitDepth = useRef(0);

  /** Snapshot every watched path from `data` into `lastEval` without firing. */
  const seedWatchers = useEffectEvent((data: Record<string, unknown>) => {
    lastEval.current = watchedPaths.current.map((path) =>
      JSON.stringify(getByPointer(data, path) ?? null),
    );
  });

  /**
   * Compare each watched path in `data` against its `lastEval` baseline and post
   * `runWatcher` for any that changed, advancing the baseline. Shared by the
   * data-change effect and the `watchers` message handler (so a watcher that
   * registers after the user already changed data still catches that edge).
   */
  const runEdgeDetect = useEffectEvent((data: Record<string, unknown>) => {
    const worker = workerRef.current;
    if (!worker) {
      return;
    }
    watchedPaths.current.forEach((path, watchId) => {
      const current = getByPointer(data, path) ?? null;
      const serialized = JSON.stringify(current);
      const prevSerialized = lastEval.current[watchId];
      if (serialized !== prevSerialized) {
        lastEval.current[watchId] = serialized;
        // Hand the watcher both sides of the edge. `previous` is parsed from the
        // serialized baseline the edge-detector already keeps (undefined on the
        // first change after seeding).
        const previous =
          prevSerialized === undefined ? undefined : JSON.parse(prevSerialized);
        worker.postMessage({
          current,
          data,
          previous,
          type: "runWatcher",
          watchId,
        });
      }
    });
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
          // Tag data changes caused by this emit as script-induced so watchers
          // ignore them (reentrancy guard).
          emitDepth.current += 1;
          let result: unknown;
          try {
            result = await emit(msg.event);
          } finally {
            emitDepth.current -= 1;
          }
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
        } else if (msg.type === "watchers") {
          watchedPaths.current = msg.paths;
          // Seed baselines from the mount-time data, then edge-detect against the
          // current data. If nothing changed before the watcher registered this
          // is a no-op; if the user already toggled something during the async
          // worker handshake, that edge fires now instead of being swallowed.
          seedWatchers(initialDataRef.current);
          runEdgeDetect(dataRef.current);
        }
      },
    );
    return instance;
  });

  /** Ensure the worker exists, spawning it on first need. */
  const ensureWorker = useEffectEvent(() => {
    if (!workerRef.current) {
      workerRef.current = spawnWorker();
    }
    return workerRef.current;
  });

  /** Tear down the current worker and abandon every in-flight run. */
  const teardown = useEffectEvent(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    watchedPaths.current = [];
    lastEval.current = [];
    for (const [invokeId] of pending) {
      settle(invokeId, undefined);
    }
  });

  // Respawn on a new `scripts` map (and dispose the old worker); dispose on
  // unmount. Spawn eagerly so watchers can fire before any user interaction.
  useEffect(() => {
    teardown();
    if (hasScripts) {
      ensureWorker();
    }
    return teardown;
  }, [scripts, hasScripts]);

  // Edge-detect watched paths on every data change and run the ones that
  // changed — unless the change was caused by a script's own emit.
  useEffect(() => {
    if (!workerRef.current || watchedPaths.current.length === 0) {
      return;
    }
    if (emitDepth.current > 0) {
      // Script-induced change: refresh baselines but do not fire watchers.
      seedWatchers(data);
      return;
    }
    runEdgeDetect(data);
  }, [data]);

  return useEffectEvent(
    (handler: string, params?: Record<string, unknown>): Promise<unknown> => {
      if (!hasScripts) {
        return Promise.resolve(undefined);
      }
      const worker = ensureWorker();
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

/** Read a JSON-pointer slice, matching the worker's getByPointer semantics. */
function getByPointer(data: Record<string, unknown>, path: string): unknown {
  if (!path || path === "/") {
    return data;
  }
  try {
    return get(data, path);
  } catch {
    return undefined;
  }
}
