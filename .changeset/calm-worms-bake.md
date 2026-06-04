---
"@optiaxiom/proteus": patch
---

Image carousel uses the shared `onPreview` interaction instead of a fullscreen dialog, and keeps an open preview in sync with the selection (without reopening it after the host closes it). Adds the exported `ProteusPreviewFile` type (required on carousel items) and an optional `previewFile` input on `ProteusDocumentShell`/`ProteusDocumentRenderer`.
