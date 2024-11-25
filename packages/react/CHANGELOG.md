# @optiaxiom/react

## 0.6.0

### Minor Changes

- 62c2cd7: introduce DialogActions component
- 1ba61e8: introduce DialogHeader component
- 98a24a1: add inline input component

### Patch Changes

- 174d990: fix framer-motion to work with react 17
- 3e97741: refactor drawer components to match dialog anatomy
- 7f0bec1: set default minW to trigger for `Combobox`

## 0.5.4

### Patch Changes

- 6feacb1: fix focus guard for AutocompleteContent
- 56be68c: add `ComboboxGroup`, `ComboboxLabel` component
- 1931c26: re-use framer-motion for animating presence
- 4bf0d74: make SegmentedControl type prop optional
- 3653876: support `intent` in `Progress` component
- fb445c3: remove appearance prop from Heading
- ad90a2e: use cursor pattern in pagination to highlight active item
- c85dfda: fix focus guard for SelectContent
- 74dc8ca: split input component into modular components
- 84e97da: by default pass thru all indicator props to anchor

## 0.5.3

### Patch Changes

- 179132c: keep cloneElement in toast provider for backwards compatibility

## 0.5.2

### Patch Changes

- Updated dependencies [c38fa7e]
  - @optiaxiom/globals@0.4.0

## 0.5.1

### Patch Changes

- ac6d0c0: fix textarea autosize in controlled usage

## 0.5.0

### Minor Changes

- 6422ae2: rename colorScheme to intent across components
- fcc3470: rename colorScheme to appearance in spinner

### Patch Changes

- 0d9918e: allow composition of link component
- f5214c0: set value on top level combobox/command component
- 37de96e: use correct key for pagination items
- 16ecdb9: changed ellipsis color for disabled state in `Pagination`
- 2fcd385: add spotlight component
- f79bf56: do not show disabled styles when in loading state
- 7ac4390: replace sidebar addons with modular components
- fd9a018: add `SelectGroup` component

## 0.4.2

### Patch Changes

- febca30: revert sprinkles merge order fix

## 0.4.1

### Patch Changes

- 485608a: fix checkbox/radio/switch gap and vertical alignment when no labels
- b0b00f2: contain visually hidden inputs within label using relative position

## 0.4.0

### Minor Changes

- 21e0e25: rename SideNav to Sidenav

### Patch Changes

- dced7e7: extract command component from combobox

## 0.3.5

### Patch Changes

- 1f6e128: replace cmdk with downshift in Combobox component
- 165f4ec: fix button group styles to handle nested elements
- 97ca195: fix disabled state for `DropdownMenuTrigger` and `PopoverTrigger`
- 2b9ce89: add support for fullscreen `dialog`
- 3dffd88: fix sprinkles merge order
- 2ec17b8: change default icon for `AlertDialogTitle` component
- 424600b: added `DropdownMenuGroup` component
- b519f32: use context to pass handlers to toasts

## 0.3.4

### Patch Changes

- a0d811a: add `iconAutosize` prop to buttons for removing icon size in icon only buttons

## 0.3.3

### Patch Changes

- cb71846: do not use flex for alert/banner descriptions

## 0.3.2

### Patch Changes

- 63427e0: move react-table to peer dependencies

## 0.3.1

### Patch Changes

- 13e0fe0: bump down react-table version constraint

## 0.3.0

### Minor Changes

- a711427: remove primitive color tokens from theme

### Patch Changes

- f2b2930: add pointerEvents sprinkle props
- 18a2dae: fix indicator z-index on focus
- 282bddb: improve alert component a11y
- 09f4057: remove `boundaries` and `siblings` props from `Pagination`
- 08138a5: added `disabled` prop for `Tooltip`
- b307bf9: fix focus ring, remove horizontal scrollbar for sidenav
- Updated dependencies [a711427]
  - @optiaxiom/globals@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [912af85]
  - @optiaxiom/globals@0.2.2

## 0.2.0

### Minor Changes

- f944028: rename RadioGroupItem to Radio
- 5fa1f68: replace brand avatar color with cyan
- 43f2670: replace radix checkbox/radio/switch with native input

### Patch Changes

- f641f6e: improve a11y of field component
- dccb30a: added customizable icon to alert dialog title via `addonBefore` prop
- bf04a2c: fix button icon size for square icons
- 4f306d5: Allow consumers to control height of dialog content box
- c9dbb8c: add support for orientation prop in RadioGroup component
- 71d18d4: add default appearance support for toggle button
- 0a378a0: support ReactNode in `label`, `description`, `error`, `info` props for `Field` component
- 55d9d4c: Added toggle button to autocomplete trigger
- Updated dependencies [45392b5]
  - @optiaxiom/globals@0.2.1

## 0.1.0

### Minor Changes

- 045f84b: release latest components
- b9a9ea2: allow module federation in axiom
- b7277df: rename secondary button to subtle
- 0f172bc: rename Toggle to ToggleButton

### Patch Changes

- de49878: fix tooltip z-index
- fe9557e: rename decorators to addons
- 1055c78: load tokens and fonts once
- a91dcdf: safely handle undefined variant selection in recipes
- 50a4805: fix button outline
- 61a8dac: refactored button appearance and icon props
- 9215e9c: add optiaxiom.base layer for controlling cascade
- 9b4f9d4: use custom solution for autosizing textarea
- eac1b2f: fixed menu z-index
- 53cae4b: support react <18 and vanilla-extract consumers
- 6e2bf14: add root AxiomProvider component
- 08b8821: add loading spinner to buttons
- 8e4c821: use sprinkles, recipes, and style from vanilla-extract #64
- 18338c9: restrict AlertDialog to only danger appearance
- b46befd: add changesets to manage versioning #7
- eb586da: only apply fallback delay if no image is present
- 80902ae: release controls and dialog components
- fe9557e: move theme/tokens to globals
- 8cdccc5: fix font size reset
- 904ddff: make DropdownMenuContent minWidth configurable
- 50a4805: rename input decorator prop
- Updated dependencies [b9a9ea2]
- Updated dependencies [1055c78]
- Updated dependencies [fe9557e]
  - @optiaxiom/globals@0.2.0

## 0.1.0-next.19

### Patch Changes

- 9b4f9d4: use custom solution for autosizing textarea

## 0.1.0-next.18

### Patch Changes

- fe9557e: rename decorators to addons
- fe9557e: move theme/tokens to globals
- Updated dependencies [fe9557e]
  - @optiaxiom/globals@0.2.0-next.2

## 0.1.0-next.17

### Patch Changes

- 1055c78: load tokens and fonts once
- Updated dependencies [1055c78]
  - @optiaxiom/globals@0.2.0-next.1

## 0.1.0-next.16

### Minor Changes

- b9a9ea2: allow module federation in axiom

### Patch Changes

- Updated dependencies [b9a9ea2]
  - @optiaxiom/globals@0.2.0-next.0

## 0.1.0-next.15

### Patch Changes

- 18338c9: restrict AlertDialog to only danger appearance

## 0.1.0-next.14

### Patch Changes

- 08b8821: add loading spinner to buttons

## 0.1.0-next.13

### Patch Changes

- 6e2bf14: add root AxiomProvider component

## 0.1.0-next.12

### Patch Changes

- a91dcdf: safely handle undefined variant selection in recipes

## 0.1.0-next.11

### Patch Changes

- eac1b2f: fixed menu z-index

## 0.1.0-next.10

### Minor Changes

- 045f84b: release latest components

## 0.1.0-next.9

### Patch Changes

- 80902ae: release controls and dialog components

## 0.1.0-next.8

### Patch Changes

- 50a4805: fix button outline
- 50a4805: rename input decorator prop

## 0.1.0-next.7

### Patch Changes

- 61a8dac: refactored button appearance and icon props

## 0.1.0-next.6

### Patch Changes

- de49878: fix tooltip z-index

## 0.1.0-next.5

### Patch Changes

- 9215e9c: add optiaxiom.base layer for controlling cascade

## 0.1.0-next.4

### Patch Changes

- 8cdccc5: fix font size reset

## 0.1.0-next.3

### Patch Changes

- 53cae4b: support react <18 and vanilla-extract consumers

## 0.1.0-next.2

### Patch Changes

- 8e4c821: use sprinkles, recipes, and style from vanilla-extract #64
- b46befd: add changesets to manage versioning #7
