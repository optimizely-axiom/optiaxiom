---
"@optiaxiom/proteus": minor
---

Add first-class list mutation primitives:

- `pushValue` / `removeValue` event handler actions, interpreted by the
  runtime, for appending to and removing from arrays in form data.
- `Length` value expression (`{ $type: "Length", path }`) for reading array
  length in conditions and values.
- `MapIndex` and `Length` are now renderable elements (not just value
  expressions), consistent with `Value`.
- `Input` with an empty `name` now binds to the current `parentPath`, enabling
  rows inside a `Map` to read/write the current array element.
