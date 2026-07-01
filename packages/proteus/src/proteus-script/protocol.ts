import type { ProteusEventHandler } from "../proteus-document/schemas";

/**
 * Messages posted from the host (main thread) into the worker.
 */
export type HostToWorkerMessage =
  | {
      /** Register the document's scripts and build the handler map. */
      scripts: Record<string, string>;
      type: "init";
    }
  | {
      /** Resolution of a previous `emit` — carries the dispatcher return value. */
      emitId: number;
      result: unknown;
      type: "emitResult";
    }
  | {
      /** Snapshot of form data readable via `ctx.getValue`. */
      data: Record<string, unknown>;
      /** `module:fn` handler to run. */
      handler: string;
      /** Correlates with the `invokeResult` reply. */
      invokeId: number;
      params: Record<string, unknown>;
      type: "invoke";
    };

/**
 * The single argument passed to a registered script handler. Its `emit`,
 * `getValue`, and `params` members are everything the handler is given to work
 * with — no capability leaks beyond re-emitting existing Proteus events.
 */
export type ScriptContext = {
  /**
   * Emit one of the existing Proteus events back to the host, where it runs
   * through the same `onEvent` dispatcher. Resolves to the dispatcher's return
   * value — only `interaction` returns something meaningful; the client-side
   * actions resolve to `undefined`.
   */
  emit: (event: ProteusEventHandler) => Promise<unknown>;
  /**
   * Read from the form-data snapshot captured at invoke time (JSON pointer,
   * same semantics as `Value`). Read-only — a mutating `emit` (e.g. pushValue)
   * is NOT observable within the same handler run. Writes must go through
   * `emit`.
   */
  getValue: (path: string) => unknown;
  /** Resolved params from the triggering event. */
  params: Record<string, unknown>;
};

export type ScriptHandler = (ctx: ScriptContext) => unknown;

/**
 * Messages posted from the worker back to the host (main thread).
 */
export type WorkerToHostMessage =
  | {
      /** A `ctx.emit(event)` call — the host re-dispatches it through `onEvent`. */
      emitId: number;
      event: ProteusEventHandler;
      type: "emit";
    }
  | {
      error?: string;
      /** Correlates with the originating `invoke`. */
      invokeId: number;
      result: unknown;
      type: "invokeResult";
    };
