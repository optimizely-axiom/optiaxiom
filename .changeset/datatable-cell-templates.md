---
"@optiaxiom/proteus": minor
---

Add custom cell rendering to `DataTable`. A column can now carry a `cell` node template instead of plain text, and a new `DataTableRow` element/expression reads the current row inside it — `{ $type: "DataTableRow", path: "status" }` reads a field, or omit `path` for the whole row (mirroring how `MapIndex` exposes the current index inside a `Map`). This lets a column render a `Badge`, `Icon`, link, or any element composition, with `Show` picking what to render per row (e.g. a change-history table whose "Change" column is a badge whose intent depends on the row). Columns without `cell` are unchanged; `cell` takes precedence over `format`.
