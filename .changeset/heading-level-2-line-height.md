---
"@optiaxiom/react": minor
"@optiaxiom/web-components": minor
"@optiaxiom/proteus": minor
"@optiaxiom/mcp": minor
---

Aligned `<Heading level="2">` with the Figma `Header/Heading 2` style: tightened `line-height` from `40px` to `30px` and bumped `font-weight` from `700` to `800`. Also added `"800"` to the accepted `fontWeight` sprinkle values (previously the scale jumped `"700"` → `"900"`), which is now reflected in the Proteus JSON schemas and the MCP metadata. Other heading levels and other consumers of `fontSize="3xl"` are unchanged.
