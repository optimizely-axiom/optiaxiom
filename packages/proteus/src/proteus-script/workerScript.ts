/**
 * Source of the sandbox Web Worker, authored as a self-contained string so it
 * can be turned into a Blob URL and run without a separate chunk or same-origin
 * file (mirrors how `ProteusBridge` inlines its shim script).
 *
 * The worker has no DOM, no `window.parent`, and communicates only via
 * structured-clone `postMessage` — a strictly tighter sandbox than an iframe.
 * A handler's sole capability is `ctx.emit`, which posts an existing Proteus
 * event back to the host to be re-dispatched. See `protocol.ts` for the message
 * shapes and `ScriptContext`.
 */
export const WORKER_SCRIPT = /* js */ `
"use strict";

const handlers = new Map();
const pendingEmits = new Map();
let nextEmitId = 1;

// Minimal JSON-pointer getter (same semantics as the host's getProteusValue).
function getByPointer(data, path) {
  if (!path || path === "/") return data;
  const parts = path.replace(/^\\//, "").split("/");
  let current = data;
  for (const raw of parts) {
    if (current == null) return undefined;
    const key = raw.replace(/~1/g, "/").replace(/~0/g, "~");
    current = current[key];
  }
  return current;
}

function register(name, fn) {
  if (typeof name !== "string" || typeof fn !== "function") {
    throw new Error("register(name, fn) requires a string name and a function");
  }
  handlers.set(name, fn);
}

// Evaluate one module's source in a scope that exposes \`register\`. Handlers are
// keyed by "moduleName:handlerName" via a per-module register wrapper.
function loadModule(moduleName, source) {
  const scopedRegister = (name, fn) => register(moduleName + ":" + name, fn);
  // eslint-disable-next-line no-new-func
  const factory = new Function("register", source);
  factory(scopedRegister);
}

function emit(event) {
  const emitId = nextEmitId++;
  return new Promise((resolve) => {
    pendingEmits.set(emitId, resolve);
    self.postMessage({ emitId, event, type: "emit" });
  });
}

self.onmessage = async (e) => {
  const msg = e.data;

  if (msg.type === "init") {
    for (const [moduleName, source] of Object.entries(msg.scripts ?? {})) {
      try {
        loadModule(moduleName, source);
      } catch (err) {
        // A broken module leaves its handlers unregistered; invokes for them
        // surface a "not found" error at call time.
      }
    }
    return;
  }

  if (msg.type === "emitResult") {
    const resolve = pendingEmits.get(msg.emitId);
    if (resolve) {
      pendingEmits.delete(msg.emitId);
      resolve(msg.result);
    }
    return;
  }

  if (msg.type === "invoke") {
    const { data, handler, invokeId, params } = msg;
    const fn = handlers.get(handler);
    if (!fn) {
      self.postMessage({
        error: 'No script handler registered for "' + handler + '"',
        invokeId,
        result: undefined,
        type: "invokeResult",
      });
      return;
    }
    const ctx = {
      emit,
      getValue: (path) => getByPointer(data, path),
      params: params ?? {},
    };
    try {
      const result = await fn(ctx);
      self.postMessage({ invokeId, result, type: "invokeResult" });
    } catch (err) {
      self.postMessage({
        error: err && err.message ? String(err.message) : String(err),
        invokeId,
        result: undefined,
        type: "invokeResult",
      });
    }
  }
};
`;
