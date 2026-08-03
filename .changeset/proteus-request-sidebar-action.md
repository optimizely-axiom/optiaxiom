---
"@optiaxiom/proteus": minor
---

Added a `requestSidebar` client-side `Action.onClick` variant and matching `onRequestSidebar({ resource, params, title })` handler on `ProteusDocumentShell` / `ProteusDocumentRenderer` so hosts can dock a named `ui://...` resource in a side panel alongside the conversation instead of over it. The variant also accepts an optional `auto: { when }` describing when a host may fire the handler without a click — hosts that do not support it ignore the field.
