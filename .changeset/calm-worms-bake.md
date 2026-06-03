---
"@optiaxiom/proteus": patch
---

image carousel fires the shared `onPreview` interaction instead of a bespoke fullscreen dialog. Each preview file is built from the real metadata the backend now attaches to carousel items, falling back to a `HEAD` request (then a URL-extension guess) for legacy `{src, alt}` cards. Adds the exported `ProteusPreviewFile` type.
