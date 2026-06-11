---
"@optiaxiom/react": patch
---

Fix `RichTextEditor` overflow when a constrained height is set. The outer
container is now a flex column with `overflow: hidden`, and the inner
content area scrolls on its own — so the toolbar stays pinned at the top
while the editable region scrolls inside.
