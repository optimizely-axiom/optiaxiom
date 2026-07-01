---
"@optiaxiom/proteus": minor
---

Add a `setValue` event action that writes `value` at a JSON-pointer `path` in form data, replacing any existing value (e.g. `{ action: "setValue", path: "/tags/2", value: "…" }`). This complements `pushValue`/`removeValue` with in-place editing — previously the only way to change an existing array entry was to remove and re-append, which lost position. Works from any event source, including scripted handlers via `ctx.emit`.
