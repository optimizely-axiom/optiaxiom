---
"@optiaxiom/proteus": minor
---

Add scriptable actions. A document can ship JavaScript via a `scripts` map and expose named handlers (`register(name, fn)`) triggered with `{ script: "module:handler", params }`. Handlers run in a sandboxed Web Worker whose only capability is `ctx.emit` — they get exactly the authority the document already had, so treat `scripts` with the same trust as the rest of the document.
