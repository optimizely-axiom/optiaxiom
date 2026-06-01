---
"@optiaxiom/mcp": patch
---

Surface deprecation info in `search_components` and `get_patterns`.

Previously only `get_component` exposed a component's `deprecated` field, so a deprecated component (e.g. `DropdownMenu`) discovered via search or composed in a returned pattern looked like a valid recommendation. `search_components` now includes the `deprecated` object (matching `get_component`), and `get_patterns` includes a `deprecated` array naming any deprecated components an example uses and their replacements.
