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
    }
  | {
      /** The value at the watched path now — passed as the 2nd callback arg. */
      current: unknown;
      /** Snapshot of form data readable via `ctx.getValue`. */
      data: Record<string, unknown>;
      /** The value at the watched path before this change — 3rd callback arg. */
      previous: unknown;
      type: "runWatcher";
      /** Index into the worker's `watchers` array to run. */
      watchId: number;
    };

/**
 * The capabilities every script callback receives as its first argument. These
 * are everything a callback is given to affect the document — no capability
 * leaks beyond re-emitting existing Proteus events.
 *
 * Trust note: this grants a callback exactly the authority the document already
 * has — it can read all form data (`getValue("/")`) and emit any event the
 * document could. It is NOT a boundary against untrusted input; author the
 * `scripts` map with the same trust as the rest of the document.
 */
export type ScriptContext = {
  /**
   * Emit one of the existing Proteus events back to the host, where it runs
   * through the same `onEvent` dispatcher. Resolves to the dispatcher's return
   * value — only `interaction` returns something meaningful; the client-side
   * actions resolve to `undefined`.
   *
   * This is the callback's only outward capability; it can do nothing the host
   * dispatcher would not do for a document-declared event.
   */
  emit: (event: ProteusEventHandler) => Promise<unknown>;
  /**
   * Read from the form-data snapshot captured at invoke time (JSON pointer,
   * same semantics as `Value`). `getValue("/")` returns the whole snapshot.
   * Read-only — a mutating `emit` (e.g. pushValue) is NOT observable within the
   * same callback run. Writes must go through `emit`.
   */
  getValue: (path: string) => unknown;
};

/**
 * A handler registered with `register(name, fn)`. Invoked as `(ctx, params)`
 * when a UI element triggers `{ script: "module:name", params }` — `params` is
 * the resolved params object the document supplied.
 */
export type ScriptHandler = (
  ctx: ScriptContext,
  params: Record<string, unknown>,
) => unknown;

/**
 * A watcher registered with `watch(path, fn)` inside a script — the push
 * counterpart to `register`'s pull. Invoked as `(ctx, current, previous)`
 * (edge-triggered) whenever the value at `path` changes: `current` is the value
 * now, `previous` the value before this change. Use `watch("/", fn)` to observe
 * all data.
 */
export type WatchHandler = (
  ctx: ScriptContext,
  current: unknown,
  previous: unknown,
) => unknown;

/**
 * Messages posted from the worker back to the host (main thread).
 */
export type WorkerToHostMessage =
  | {
      /**
       * The JSON-pointer path each registered watcher observes, sent once after
       * `init`. Index = watcher id; the host edge-detects each path and posts a
       * `runWatcher` when the value there changes.
       */
      paths: string[];
      type: "watchers";
    }
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
