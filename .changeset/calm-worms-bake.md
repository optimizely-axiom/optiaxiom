---
"@optiaxiom/proteus": patch
---

image carousel fires the shared `onPreview` interaction instead of a bespoke fullscreen dialog. Each preview file is built from the real metadata the backend now attaches to carousel items, falling back to a `HEAD` request (then a URL-extension guess) for legacy `{src, alt}` cards. Adds the exported `ProteusPreviewFile` type.

The carousel also keeps an already-open preview in sync as the selection changes (next/previous/thumbnail/arrow keys), and stops updating it once the host closes the preview so navigation no longer reopens it. Adds an optional `previewFile` input on `ProteusDocumentShell`/`ProteusDocumentRenderer` (exposed via the document context) so components can observe which file the host is currently previewing.
