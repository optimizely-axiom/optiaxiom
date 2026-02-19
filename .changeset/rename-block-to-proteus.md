---
"@optiaxiom/react": patch
---

Rename Block Document to Proteus Document

All Block-related components, types, and discriminator values have been renamed to Proteus:

- `BlockDocumentRenderer` → `ProteusDocumentRenderer`
- `BlockAction`, `BlockField`, `BlockGroup`, `BlockHeading`, `BlockImage`, `BlockInput`, `BlockLink`, `BlockRange`, `BlockSelect`, `BlockSelectContent`, `BlockSelectTrigger`, `BlockSeparator`, `BlockText`, `BlockTextarea`, `BlockCancelAction` → `ProteusAction`, `ProteusField`, `ProteusGroup`, `ProteusHeading`, `ProteusImage`, `ProteusInput`, `ProteusLink`, `ProteusRange`, `ProteusSelect`, `ProteusSelectContent`, `ProteusSelectTrigger`, `ProteusSeparator`, `ProteusText`, `ProteusTextarea`, `ProteusCancelAction`
- Discriminator values: `"Block.Document"` → `"Proteus.Document"`, `"Block.Action"` → `"Proteus.Action"`, etc.
- Types: `BlockDocument`, `BlockElement`, `BlockNode`, etc. → `ProteusDocument`, `ProteusElement`, `ProteusNode`, etc.

This is an unstable API exported from `@optiaxiom/react/unstable`.
