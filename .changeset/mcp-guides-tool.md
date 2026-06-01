---
"@optiaxiom/mcp": patch
---

Add `get_tests` and `get_guides` tools and remove the component/guide resources.

The `component` resource duplicated `get_component` with less capability, and the `guide` resource was undiscoverable (a `ResourceTemplate` with no `list` callback). Guides are now exposed via a `get_guides` tool — omit `names` to list all guides, or pass a space-separated list to fetch their content. The available guides are derived at build time from the docs nav manifest, so every shipped guide is surfaced automatically.
