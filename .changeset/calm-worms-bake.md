---
"@optiaxiom/proteus": patch
---

Image carousel uses the shared `onPreview` interaction instead of a fullscreen dialog, building each preview file from the metadata the host supplies. Adds the exported `ProteusPreviewFile` type and requires it on carousel items.
