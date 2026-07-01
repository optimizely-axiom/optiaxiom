---
"@optiaxiom/proteus": minor
---

Add scriptable actions. A document can now ship JavaScript via a `scripts` map (`{ moduleName: "…js…" }`) and expose named handlers with `register(name, fn)`. Trigger a handler from any event source with `{ script: "module:handler", params }`. Handlers run in a sandboxed Web Worker and receive a single `ctx` (`{ emit, getValue, params }`) — their only capability is to re-emit the existing Proteus events through `ctx.emit`, so scripted actions get exactly the authority the document already had.
