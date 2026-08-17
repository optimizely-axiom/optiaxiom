---
"@optiaxiom/react": minor
"@optiaxiom/web-components": minor
"@optiaxiom/proteus": minor
"@optiaxiom/mcp": minor
---

Aligned `<Heading level="2">` with the Figma `Header/Heading 2` style: tightened `line-height` from `40px` to `30px` and bumped `font-weight` from `700` to `800`. Also added `"800"` to the accepted `fontWeight` sprinkle values (previously the scale jumped `"700"` → `"900"`), which is now reflected in the Proteus JSON schemas and the MCP metadata. Other heading levels and other consumers of `fontSize="3xl"` are unchanged.

**Visual change:** apps using bare `<Heading level="2">` will render tighter and heavier — review level-2 headings for re-flow, clipped descenders, and vertical-rhythm drift before upgrading. To fully opt out on a case-by-case basis, pass an explicit `fontSize`, which restores both the `700` weight and the token's `40px` line-height. Passing only an explicit `fontWeight` overrides the weight but leaves the tighter `30px` line-height in place.
