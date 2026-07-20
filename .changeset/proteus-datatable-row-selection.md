---
"@optiaxiom/proteus": minor
---

Add checkbox support to Proteus:

- Add a `Checkbox` element (a boolean form control bound to a data path via `name`, mirroring `Switch`).
- Add a `rowSelection` prop to the `DataTable` element. Pointing it at a data path (e.g. `"/selection"`) renders a select-all header checkbox and a per-row checkbox column, and writes the selected row objects as an array to that path so an action can read them via `Value`.
