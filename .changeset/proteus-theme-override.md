---
"@optiaxiom/proteus": minor
---

added `themeOverride` to `ProteusDocumentRenderer` for re-skinning a document without touching its element tree. It accepts a partial of the Axiom `theme` contract (any subset of any token category) and applies the tokens you provide as scoped CSS variables — only the listed tokens are overridden, and the overrides affect that document's subtree only.
