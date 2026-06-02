# @optiaxiom/mcp

## 3.0.1

### Patch Changes

- 24ca94f: Surface deprecation info in `search_components` and `get_patterns`.

  Previously only `get_component` exposed a component's `deprecated` field, so a deprecated component (e.g. `DropdownMenu`) discovered via search or composed in a returned pattern looked like a valid recommendation. `search_components` now includes the `deprecated` object (matching `get_component`), and `get_patterns` includes a `deprecated` array naming any deprecated components an example uses and their replacements.

- d086a91: Add `get_tests` and `get_guides` tools and remove the component/guide resources.

  The `component` resource duplicated `get_component` with less capability, and the `guide` resource was undiscoverable (a `ResourceTemplate` with no `list` callback). Guides are now exposed via a `get_guides` tool — omit `names` to list all guides, or pass a space-separated list to fetch their content. The available guides are derived at build time from the docs nav manifest, so every shipped guide is surfaced automatically.

## 3.0.0

### Major Changes

- ee1ccc2: Update design tokens to v3 for the rebrand — colors, border radius, fonts, and pill tokens.

### Patch Changes

- f597c7d: Replace icon usage with Material/Google icons; support Font Awesome icons in Button.

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
