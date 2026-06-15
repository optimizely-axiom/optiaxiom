# @optiaxiom/mcp

## 1.0.2

### Patch Changes

- d9cd5cd: Surface key styling documentation as guides so AI clients learn the canonical ways to consume tokens and styles. `get_guides` now returns the `design-tokens`, `colors`, and `responsive-styles` pages with their examples inlined as code (style props, CSS variables, the `theme` object, dark mode, and responsive object/array notation), and the `get_tokens` description points at the design-tokens guide. Select pages from the docs `styling/` section are surfaced via the `STYLING_GUIDES` allowlist.

## 1.0.1

### Patch Changes

- bc978e6: Surface deprecation info in `search_components` and `get_patterns`.

  Previously only `get_component` exposed a component's `deprecated` field, so a deprecated component (e.g. `DropdownMenu`) discovered via search or composed in a returned pattern looked like a valid recommendation. `search_components` now includes the `deprecated` object (matching `get_component`), and `get_patterns` includes a `deprecated` array naming any deprecated components an example uses and their replacements.

- 9cb1d5b: Add `get_tests` and `get_guides` tools and remove the component/guide resources.

  The `component` resource duplicated `get_component` with less capability, and the `guide` resource was undiscoverable (a `ResourceTemplate` with no `list` callback). Guides are now exposed via a `get_guides` tool — omit `names` to list all guides, or pass a space-separated list to fetch their content. The available guides are derived at build time from the docs nav manifest, so every shipped guide is surfaced automatically.

## 1.0.0

### Major Changes

- f87e539: Promote packages to v1 to align major version numbers across the Axiom ecosystem. No code changes — this release exists solely to give every public package a stable `^1` install range alongside `@optiaxiom/react@^1`.

## 0.2.7

### Patch Changes

- 4de6dc5: update dependencies

## 0.2.6

### Patch Changes

- 0fd224c: expand and include exact shape of select/menu options
- c04d42e: document required sub-components for Menu and Select

## 0.2.5

### Patch Changes

- 29771cb: add a negative penalty for deprecated components

## 0.2.4

### Patch Changes

- b595c85: optimize prop and component descriptions to reduce token usage

## 0.2.3

### Patch Changes

- 8ecffd0: optimize the get_tokens tool

## 0.2.2

### Patch Changes

- 433d7b8: reduce MCP tool response size and improve search capabilities

## 0.2.1

### Patch Changes

- 3814f9f: optimize prop output to reduce token usage for end users
- 71bf7f3: add new icons

## 0.2.0

### Minor Changes

- 9e29cf8: add Group component and deprecate Flex

## 0.1.2

### Patch Changes

- f7bbc94: fix build script

## 0.1.1

### Patch Changes

- fc9e889: add mcp server
