"use client";

import { useEffect, useMemo, useRef } from "react";

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
 * Spins up a single sandbox Web Worker for the document's `scripts` and returns
 * a `runScript(handler, params)` that invokes a named handler inside it. Events
 * the handler emits are routed back through `onEmit` (the shell dispatcher) and
 * their results returned to the worker, so `ctx.emit` round-trips work.
 *
 * Returns `undefined` when the document ships no scripts — no worker is spawned.
 */
export function useProteusScripts({
  data,
  onEmit,
  scripts,
}: UseProteusScriptsOptions) {
  const dataRef = useRef(data);
  dataRef.current = data;

  const emit = useEffectEvent(onEmit);

  const worker = useMemo(() => {
    if (!scripts || Object.keys(scripts).length === 0) {
      return null;
    }
    const url = URL.createObjectURL(
      new Blob([WORKER_SCRIPT], { type: "text/javascript" }),
    );
    const instance = new Worker(url);
    URL.revokeObjectURL(url);
    instance.postMessage({ scripts, type: "init" });
    return instance;
  }, [scripts]);

  const pending = useRef(new Map<number, (value: unknown) => void>()).current;
  const nextId = useRef(1);

  useEffect(() => {
    if (!worker) {
      return;
    }
    const onMessage = async (e: MessageEvent<WorkerToHostMessage>) => {
      const msg = e.data;
      if (msg.type === "emit") {
        const result = await emit(msg.event);
        worker.postMessage({ emitId: msg.emitId, result, type: "emitResult" });
      } else if (msg.type === "invokeResult") {
        // A failed handler (bad name / thrown) resolves to undefined — matching
        // the non-strict "fail silently" default of the other Proteus ops. The
        // error travels on `msg.error` for future strict-mode surfacing.
        const resolve = pending.get(msg.invokeId);
        if (resolve) {
          pending.delete(msg.invokeId);
          resolve(msg.result);
        }
      }
    };
    worker.addEventListener("message", onMessage);
    return () => {
      worker.removeEventListener("message", onMessage);
      worker.terminate();
    };
  }, [worker, pending]);

  return useEffectEvent(
    (handler: string, params?: Record<string, unknown>): Promise<unknown> => {
      if (!worker) {
        return Promise.resolve(undefined);
      }
      const invokeId = nextId.current++;
      return new Promise((resolve) => {
        pending.set(invokeId, resolve);
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
