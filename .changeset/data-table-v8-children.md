---
"@optiaxiom/react": patch
"@optiaxiom/web-components": patch
---

fixed `DataTable` with a TanStack Table v8 table not updating `DataTableBody` and other parts passed in as `children` from outside the component that calls `useReactTable`, such as after sorting
