# @optiaxiom/mcp

## 3.4.0

### Minor Changes

- d6996ee: added `showCount` to `Field` for a character count
- ccf4c42: added docs page accessibility notes to `get_component`
- c995a63: described props with JSON Schema, including option fields

### Patch Changes

- 7b0fd5d: documented accessibility of `Field` `info`, `VisuallyHidden`, `DataTableCheckbox`, `Button` `loading`
- d89a42e: set `aria-busy` on loading `Button`
- 6990d34: named `CardCheckbox` and `DataTableCheckbox` from a consumer `aria-label`
- 92c64c9: named common search terms in component descriptions
- 4658802: documented wrapping `DataTableCheckbox` in `Cover`
- 1c7f76c: added `empty` prop to `DataTableBody` for empty states
- e06918e: added a `DataTable` list view example with search and filters
- 446bed3: documented `DateInput` `min`/`max` format for each `type`
- f45b404: documented that `Calendar` and `DateRangePicker` values use local time
- c3cd8cc: pointed Dialog at guidance for third-party overlays
- e51a3ae: pointed test tools at the component locator guide
- 7306434: explain sizing `Field` instead of its input
- 52f1c31: fit popover, menu and select content to narrow viewports
- 87f6e42: documented `value` and `checked` props on form controls
- f481700: named the HoverCard trigger example by its purpose
- a3926d1: documented icon coloring in the icons guide
- 164e9af: added `InlineInput` test examples
- 258fd73: used `@optiaxiom/icons` in `Input` pattern examples
- 6a1f3c2: documented jsdom stubs and CSS parse errors in test guide
- 3331d7c: documented `Menu` as a `LabelMenuButton` trigger for filters
- 4d1c296: documented that `Menu` and `Select` groups are identified by `label`
- 277bb9e: added `Locale` dictionaries to `AxiomProvider` `locale` for built-in labels
- 18a5312: fixed the Claude Code setup instructions in the README
- 43a091e: added a `DateInput` testing example
- 731971a: explained disabled buttons with visible text in examples
- 6c63fbf: pointed `get_tests` to the test environments guide
- 4142bc5: fixed menu button docs links, examples and accessibility notes
- 3e64a38: fixed Input copy example copying an empty string
- 89f2cf2: added jsdom `ResizeObserver` stub to test environments guide
- 87af1eb: trimmed tool descriptions; prop format notes ship with prop definitions
- eadadc5: added jsdom `matchMedia` guidance to test environments guide
- 586cd47: added `Menu` and `Select` reference tests
- f1426c7: described object fields inside object props, like option `group`
- 443c3c5: stopped repeating group accessibility notes on sub-components
- f3e7686: ranked `get_patterns` results by requested component coverage
- 0a1f294: matched `get_patterns` queries against docs headings and descriptions
- f3e7686: fixed `get_patterns` missing demos that never import their component
- 893d578: described record props like `Sortable` `items` with `additionalProperties`
- c585096: fixed `ToastProvider` docs link
- bd6b6e3: describe props mixing an object with primitives or null as `anyOf`
- 75fea92: allow keyboard navigation to disabled `Menu` and `Select` items
- eadadc5: clarified that Menu `size` only applies from the `sm` breakpoint
- 6067c81: keep submenu filter text when options refresh
- 733d03c: added `minH` prop for `0` and `auto` min-height
- a09a8d2: set `aria-current="page"` on active `NavItem`
- 5dfd3f6: added `Pagination` test pattern
- 3ea20cc: clarified that spacing has no CSS variable or theme entry
- 1dadf17: pinned Radix dependencies to their latest React 17-compatible release
- 1896668: documented deselecting the active item in single `SegmentedControl`
- 601ec05: added `Select` test pattern
- 9266661: `Sortable` announces items by name and position; items accept `{ id, label }`
- c7333c4: fixed `Sortable` crashing on React 16 and 17
- fd1e032: set up reference tests through a shared `setup()`
- 6b005b8: noted how to align `TableHeaderCell` content
- 6c51162: fixed controlled `Tabs` calling `onValueChange` twice per click
- 733b5e9: pointed `Text` and `Heading` docs to `fontSize` for font size
- 4dce299: fixed `Time` description
- 3308a7b: keep toasts with an action open 1.5× longer
- b30cc09: document when not to use a toast
- c388672: noted scroll-container inset for `Checkbox` and `RadioGroup`
- 3d77c4d: noted that `Tooltip` triggers must be keyboard focusable
- a768918: noted when to use `Popover` over `Tooltip`
- 5378b83: added German, Spanish, French and Japanese `Locale` entry points

## 3.3.0

### Minor Changes

- 1adf1e1: added per-icon entry points like `@optiaxiom/icons/IconTrashCan`
- ddac140: added breakpoint widths to `get_tokens`
- fe8e828: added `entryPoint` to `get_component`
- 2483654: marked responsive style props with `responsive: true`

### Patch Changes

- 6d5faa7: fixed import statements for unstable and editor components
- 3e9ec7a: added per-component entry points like `@optiaxiom/react/button`
- 472f4c0: added `@optiaxiom/react/testing` entry point for `cleanup`
- 2d69894: regenerated component data for responsive padding and margin

## 3.2.4

### Patch Changes

- aa2de15: replaced `IconSparkles` with the custom Axiom AI sparkles glyph
- 8ce63cf: added custom Virtual Teammate icon as `IconPersonSparkles`

## 3.2.3

### Patch Changes

- 344b9a1: added "graph" and "dxp" search tags to `IconHub` and `IconSettingsSlowMotion`

## 3.2.2

### Patch Changes

- c9211eb: Add Material Symbols settings slow motion icon as `IconSettingsSlowMotion`
- 387d807: Add Material Symbols hub icon as `IconHub`

## 3.2.1

### Patch Changes

- 98c0b0d: Regenerated icon data to include `IconVerified`.

## 3.2.0

### Minor Changes

- a545f99: add `createServer()` for one independent server per request

### Patch Changes

- 4ea92fb: added `sm` size to `Checkbox` via `size` prop
- 1dc76bc: importing the package no longer starts a stdio server
- 4db6604: fix `types` path so TypeScript consumers resolve declarations

## 3.1.2

### Patch Changes

- ff2a4dd: Regenerated icon data to include `IconMic` and `IconMicOff`.

## 3.1.1

### Patch Changes

- d192300: added `--ax-styles-scale` to decouple sizing from root font size

## 3.1.0

### Minor Changes

- 12f3d8c: added `typography` guide covering when to use `Heading` and `Text`

### Patch Changes

- cdc3723: refreshed guide content for the reorganised docs
- 09a1726: marked `Avatar` `colorScheme` as deprecated
- d67cfb1: updated guide links to new `/props` docs routes

## 3.0.11

### Patch Changes

- b1ca2ba: Regenerated icon data to include `IconWeb`.

## 3.0.10

### Patch Changes

- f751816: Fixed Arabic text rendering in the `mono` font stack.

## 3.0.9

### Patch Changes

- c96065a: Regenerated the embedded metadata for the updated `Heading` `level` documentation.
- 55f56fe: Regenerated icon data to include `IconSwitchAccount` and `IconPinboard`.

## 3.0.8

### Patch Changes

- a5a2ccd: fix undo/ArrowRotateLeft icon

## 3.0.7

### Patch Changes

- e8fcf32: Added the `bg.message.neutral` color token (light `#F5F6F7` / dark `#3C3D40`), usable via the `bg` sprinkle prop as `bg="message.neutral"`.

## 3.0.6

### Patch Changes

- 3b08b06: Regenerated icon data to include `IconDomain`.

## 3.0.5

### Patch Changes

- 24fbe63: Regenerated icon data to include `IconRecordVoiceOver`.
- f211b2a: regenerated the embedded docs data so the `DateRangePickerTrigger` `formatRange` prop reports a clean `(startDate: Date, endDate: Date) => string` type instead of a truncated overloaded signature.

## 3.0.4

### Patch Changes

- a08538e: Update the embedded Icons guide so the icon gallery leads the page, matching the docs site.
- 57936b8: Update layout demo examples to use the branded `bg.warning.light` token instead of `bg.avatar.purple`.

## 3.0.3

### Patch Changes

- 068edf7: Regenerated the bundled metadata and made its generation deterministic so the committed data stays in sync with `@optiaxiom/react` and `@optiaxiom/globals`. The `get_patterns` example `code` is now a list of `{ filename, content }` objects (in display order) instead of a filename-to-contents map.

## 3.0.2

### Patch Changes

- 88263eb: Surface key styling documentation as guides so AI clients learn the canonical ways to consume tokens and styles. `get_guides` now returns the `design-tokens`, `colors`, and `responsive-styles` pages with their examples inlined as code (style props, CSS variables, the `theme` object, dark mode, and responsive object/array notation), and the `get_tokens` description points at the design-tokens guide. Select pages from the docs `styling/` section are surfaced via the `STYLING_GUIDES` allowlist.

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
