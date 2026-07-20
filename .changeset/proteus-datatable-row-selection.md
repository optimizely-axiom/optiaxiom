---
"@optiaxiom/proteus": minor
---

Add `rowSelection` prop to the `DataTable` element. Pointing it at a data path (e.g. `"/selection"`) renders a select-all header checkbox and a per-row checkbox column, and writes the selected row objects as an array to that path so an action can read them via `Value`.
