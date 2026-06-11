---
"@optiaxiom/mcp": patch
---

Surface key styling documentation as guides so AI clients learn the canonical ways to consume tokens and styles. `get_guides` now returns the `design-tokens`, `colors`, and `responsive-styles` pages with their examples inlined as code (style props, CSS variables, the `theme` object, dark mode, and responsive object/array notation), and the `get_tokens` description points at the design-tokens guide. Select pages from the docs `styling/` section are surfaced via the `STYLING_GUIDES` allowlist.
