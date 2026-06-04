---
"@optiaxiom/proteus": patch
---

image carousel fires the shared `onPreview` interaction instead of a bespoke fullscreen dialog, building each preview file from the metadata the host supplies on every carousel item. Adds the exported `ProteusPreviewFile` type and requires it on carousel items.

The carousel also keeps an already-open preview in sync as the selection changes (next/previous/thumbnail/arrow keys), and stops updating it once the host closes the preview so navigation no longer reopens it. Adds an optional `previewFile` input on `ProteusDocumentShell`/`ProteusDocumentRenderer` (exposed via the document context) so components can observe which file the host is currently previewing.
