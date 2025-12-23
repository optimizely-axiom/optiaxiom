---
"@optiaxiom/react": minor
---

Rename Flow Document to Block Document

All Flow-related components, types, and discriminator values have been renamed to Block:

- `FlowDocumentRenderer` → `BlockDocumentRenderer`
- `FlowAction`, `FlowField`, `FlowGroup`, `FlowHeading`, `FlowInput`, `FlowText`, `FlowTextarea`, `FlowCancelAction` → `BlockAction`, `BlockField`, `BlockGroup`, `BlockHeading`, `BlockInput`, `BlockText`, `BlockTextarea`, `BlockCancelAction`
- Discriminator values: `"Flow.Document"` → `"Block.Document"`, `"Flow.Action"` → `"Block.Action"`, etc.
- Types: `FlowDocumentElement`, `FlowElement`, `FlowNode`, etc. → `BlockDocumentElement`, `BlockElement`, `BlockNode`, etc.

The `BlockDocumentRenderer` component supports:

- Layout with Block.Group (flexDirection, gap)
- Typography with Block.Heading and Block.Text
- Form inputs with Block.Field, Block.Input, Block.Textarea
- Actions with Block.Action and Block.CancelAction
- Blocking and readonly modes
- Controlled component pattern with external state management
- Runtime validation with Zod schemas and graceful degradation

This is an unstable API exported from `@optiaxiom/react/unstable`.
