# @optiaxiom/react

## 1.5.12

### Patch Changes

- 248edc5: fix textarea scrollbar for manual resize

## 1.5.11

### Patch Changes

- d2ae123: improve menu open performance
- a0996f4: allow disclosure to always be present in DOM
- 4e6b3e0: directly render PopperAnchor
- a45b96a: shake alert dialog when trying to dismiss with overlay

## 1.5.10

### Patch Changes

- b29374e: ability to skip ranking menu items by search score
- 8c2a990: provide inputValue context to item addons and description
- ef1260f: fix command scroll into view behavior
- 097f483: allow breadcrumb buttons
- 64815f7: fix menu item selection

## 1.5.9

### Patch Changes

- dd91307: fix sidebar non-collapsible group label alignment
- 49bcc16: do not highlight selected item in Menu
- 5fc6839: allow minW on MenuContent
- c2df343: keep toasts positioned correctly on scroll lock
- 988276e: add FileUpload component
- 499c1d1: fix overflow for maxRows and auto sizing textarea
- 0d10b31: allow loading spinner inside menu input
- 8a15bf0: implement scoring for menu filter
- 43a55fd: fix default spinner vertical alignment
- 11045dd: fix DialogForm scrolling

## 1.5.8

### Patch Changes

- 1b15ce5: remove default justify-content from Flex
- 5bdbc83: apply autoprefixer postcss plugin
- fa12c0e: disable selection of text inside badges
- 85d7236: allow switch toggle inside menu items
- 6878839: fix moving focus while popover is closing

## 1.5.7

### Patch Changes

- 45a597b: fix switch hover color

## 1.5.6

### Patch Changes

- 5f1462b: simplify Sortable API
- a6afa73: rename toast "type" property to "intent"
- fdeaaad: fix menu dialog aria-labels
- fd5c164: a11y fixes
- c6f3e31: add opal variants to components
- 7150d90: fix nested TransitionGroup closing
- 511d99c: manually scroll selected item into view after mount
- Updated dependencies [a6afa73]
  - @optiaxiom/globals@1.0.8

## 1.5.5

### Patch Changes

- 292edd1: simply remove TooltipTrigger when tooltip is disabled or empty
- fa86de1: allow composing tabs trigger using asChild
- eb9f70a: update dependencies
- 3a6bd09: improve focus bookmark managing via focusin events
- 4383f8a: add SortableList component for multiple lists
- Updated dependencies [eb9f70a]
  - @optiaxiom/globals@1.0.7

## 1.5.4

### Patch Changes

- dc144d1: fix module federation usage for AxiomProvider
- Updated dependencies [dc144d1]
  - @optiaxiom/globals@1.0.6

## 1.5.3

### Patch Changes

- d227776: improve link handling in menu
- a69ba32: fix breadcrumb item rendering

## 1.5.2

### Patch Changes

- bf7deca: revert breadcrumb to more structured/configurable API
- ddd25e3: restrict min-height of calendar when inside popover placed on top
- 55fe331: rename menu link prop to href
- d0004a1: use onPointerMove to disable tooltip trigger
- bfd8dca: fix table action focus on initial render

## 1.5.1

### Patch Changes

- ee1b30f: remove minW from submenu popover
- 0c2e4d5: remove minW=trigger from all popovers except Select
- b14e956: freeze children when closing TransitionGroup
- 7a6ca33: automatically restore focus back to menu from nested dialog

## 1.5.0

### Minor Changes

- b56b4cb: add basic Sortable component
- 9ce9ed9: refactor Card to simplify API

### Patch Changes

- 95ffd99: add DataTableAction for primary/secondary actions
- 68adb62: rename Link overlay prop to cover
- 5bf9b5d: add priority to menu items
- e1da995: update dependencies
- 48373ac: bump down indicator size for today on calendar
- d9ea02b: forward non style/sprinkle props to inner table instance
- 9cb019b: allow packages to work in legacy CJS environments
- f0eeb7a: add DataTableLabel to label rows for a11y
- d22bb5a: allow whole row to be selectable in DataTable
- 4e1ffa0: handle line-clamp for tooltip clipping detection
- ffde537: rename inputVisible prop to make intent clearer
- 6f7f5aa: allow generating sub options based on context
- 61af1a9: add onValueChange prop to input
- 0fca0f9: simplify transition types
- Updated dependencies [e1da995]
- Updated dependencies [9cb019b]
  - @optiaxiom/globals@1.0.5

## 1.4.5

### Patch Changes

- f440bca: fix regression from portal refactor
- f04c828: allow configuring NavGroup to be collapsible
- 01ce4f5: remove max-height restriction from menu content
- 29a2bf1: handle SubNav item not having icon
- 51b6275: add danger intent to menu items

## 1.4.4

### Patch Changes

- e10b393: use resize observer to minimize layout shift
- 5185772: add aria attributes to support virtualized listbox

## 1.4.3

### Patch Changes

- caa7d34: fix detecting group/separator options in ListboxItemized

## 1.4.2

### Patch Changes

- 4e0c2cc: provide dismiss context to execute method
- 0116466: correctly override pointer props
- d680428: prevent command input from losing focus

## 1.4.1

### Patch Changes

- 1df8b2b: make portal context optional
- 4e64ba7: calculate correct flex ratio of columns
- 1bb3b18: use skeleton loader in menu and select

## 1.4.0

### Minor Changes

- 9b3d39b: move Select to stable
- 5b87c01: move DateInput and DateRangePicker to stable

### Patch Changes

- c2a4488: export Cover component
- b00fa51: gracefully handle rendering inside shadow DOM
- e7ceafb: remove DatePicker component
- be44c98: allow filtering submenus
- f1db7c0: use unique key for sub option in menu search result
- 9d6f0bf: move Table and DataTable out of alpha
- 913b147: fix initial highlight index
- 55ed612: fix downshift web-components exports
- c15a05b: hide nested menu on scroll
- d142cc5: improve detection of addon click in input

## 1.3.6

### Patch Changes

- 1641315: change initial input visible logic
- a5821cb: fix handling submenus
- fca0e16: show group separator for first and last item

## 1.3.5

### Patch Changes

- e7be803: do not reset highlight when mouse leaves menu

## 1.3.4

### Patch Changes

- 39ca264: do not remove UA buttons/icons from inputs by default
- 4905016: export DataTableHeaderCell for internal usage

## 1.3.3

### Patch Changes

- 52e9d6d: improve aria-label of select trigger
- 420cb2f: improve collapse/expand a11y for select and menu
- 4caba9c: fix native date picker for firefox
- abaf1fd: update dependencies
- 482601b: fix menu group handling
- 1904635: support truncation in breadcrumb items
- f309e9c: improve date range selection UX
- c448c2f: highlight first item when opening select
- b3db596: replace raw context with radix context util
- 15092c4: prevent nested p tag in tooltip content
- b619bdd: allow toggling select value using arrow right/left keys
- 137920f: do not consider multi select items for initial highlight
- b8fbfe1: improve slot display name
- 2b448c0: exclude disabled items from initial highlight
- 7bc280e: auto close date picker after selection
- Updated dependencies [abaf1fd]
  - @optiaxiom/globals@1.0.4

## 1.3.2

### Patch Changes

- 50fa0b2: fix regular cell width compared to fill cell
- dd4e0a7: fix converting plain min/max date to instant
- 4ab0ba1: disabled menu checkbox should also be disabled
- ca3df93: fix field content alignment
- 1e492ed: hide clear button in date input picker if required

## 1.3.1

### Patch Changes

- 6e2b529: support arbitrary nested menus

## 1.3.0

### Minor Changes

- 594898a: rename Combobox to Menu
- a6e4a2f: refactor Select component options

### Patch Changes

- 8cf742d: display fixed weeks and outside days for date range picker
- 393eab4: refactor combobox to support nested menus

## 1.2.5

### Patch Changes

- 42431fa: handle long text inside disclosure trigger

## 1.2.4

### Patch Changes

- 61afcf3: give avatar children priority as fallback over initials
- ba3f295: simplify setting empty message in combobox
- d6bc27a: add animation for single listbox indicator
- 8cfc861: remove placeholder and value rendering from combobox trigger
- 394b43a: add ability to customize filter for combobox defaultItems
- 754b8e2: set date range end date to end of day in DateRangePicker
- bc00de3: wait for enter animation end before scrolling in virtual list
- b992e6b: show empty state in virtualized combobox

## 1.2.3

### Patch Changes

- be16d0c: collapse portal and toast viewport element
- cd61f1d: fix nested dropdown open state
- b264fff: allow uncontrolled filtering of Command items
- 9a3fd88: rename ComboboxScrollArea to ComboboxListbox
- 4b488b7: observe value of DateInput and SearchInput
- 711d744: add nested dropdown combobox components

## 1.2.2

### Patch Changes

- dd09828: fix dropdown highlight

## 1.2.1

### Patch Changes

- d308d23: set select popover min-width to trigger

## 1.2.0

### Minor Changes

- 3e36dca: refactor item/value Select API
- 855de4a: refactor Combobox selection API
- 6fcd605: simplify Combobox virtualization and also enable in Select component

### Patch Changes

- 64a9519: populate combobox items by default
- eac251d: do not use controlled value for SearchInput
- df7a5cd: support form usage with hidden select
- c9fd619: populate select items by default

## 1.1.3

### Patch Changes

- 26288f8: highlight first selected item in combobox
- 33961d1: prevent selection on space if there is search value
- c3d12fe: close date range picker on selecting end date
- b253d3e: wait for DOM paint before setting presence to true
- 0d74a01: animate closing select popover

## 1.1.2

### Patch Changes

- b62ebc5: use DateTimeFormat to show time zone name
- 1e49827: Add `LabelMenuButton` component
- d7a8d50: allow deselecting values from Select component
- a54216f: fix height of virtualized combobox list

## 1.1.1

### Patch Changes

- 267d678: fix calendar button vertical gap

## 1.1.0

### Minor Changes

- ecd95b4: remove default font-size from Text component

### Patch Changes

- 3533644: update dependencies
- Updated dependencies [3533644]
  - @optiaxiom/globals@1.0.3

## 1.0.3

### Patch Changes

- e020c8f: allow dynamic virtual combobox item height
- 125e586: add time controls to DateInput component
- 9a6460e: use updated design for time controls
- d7fc0d0: incorporate clock into calendar component
- 711f62c: fix returning focus to date input on picker close
- 8e260b3: use correct index when scrolling inside combobox virtual list
- 0323fb3: use full component name in context providers and consumers
- Updated dependencies [0323fb3]
  - @optiaxiom/globals@1.0.2

## 1.0.2

### Patch Changes

- 27bcf70: fix date input date parsing
- e4337d3: fix disabled dates on calendar

## 1.0.1

### Patch Changes

- 2d1c5ad: more strict type check in calendar when setting default month
- Updated dependencies [e48e274]
  - @optiaxiom/globals@1.0.1

## 1.0.0

### Major Changes

- b95fcaa: initial release

### Patch Changes

- f6e25e1: remove invalid align-items values
- 66a3a34: fix sidebar nav group padding
- 47e36be: add flex-start/flex-end to justifyContent
- b03d0bf: remove unused empty sprinkle
- 1961b53: set font-family via css var
- Updated dependencies [f6e25e1]
- Updated dependencies [b95fcaa]
  - @optiaxiom/globals@1.0.0

## 0.13.11

### Patch Changes

- 4070e40: sync disclosure spec with figma
- c2bf8b6: fix button alignment
- ef5a627: fix table pagination layout shifting

## 0.13.10

### Patch Changes

- 38d8169: fix DataTable height and alignment
- 6dd8143: stretch table to fill container
- 576fdf4: add holiday and weekend support to calendar
- 0bf80fe: add DatePicker component
- 219b810: promote secondary nav components to stable
- e04d773: remove redundant Value component part
- d244eec: add DateRangePicker component

## 0.13.9

### Patch Changes

- 6b0470d: add xl size borderRadius token
- 54dae70: fix appending addonBefore in SearchInput
- Updated dependencies [6b0470d]
  - @optiaxiom/globals@0.7.5

## 0.13.8

### Patch Changes

- 873fc41: add page size options and row count
- d9ffa72: fix aria-labelledby overriding in SelectTrigger
- a4816b2: split DataTable into modular parts

## 0.13.7

### Patch Changes

- 0ba2ad8: fix nested ModalLayer usage

## 0.13.6

### Patch Changes

- 89b65db: remove Drawer component

## 0.13.5

### Patch Changes

- be08e41: fix disclosure trigger size
- 0936f3e: pass shard ref to scroll lock

## 0.13.4

### Patch Changes

- 64ef870: fallback to static alt if name is missing
- 83d37e6: add table column resize handle
- 399ce88: fix command placed callback
- 6e292f9: add width constraint for combobox popover
- df58ff5: add stable scrollbar to dialog body
- 343e444: add row selection

## 0.13.3

### Patch Changes

- a2e5ec7: use context to conditionally enable modal layer

## 0.13.2

### Patch Changes

- fc1836f: use before pseudo element in cover component
- 9568546: simplify drawer components
- e1eee45: refactor presence of popovers

## 0.13.1

### Patch Changes

- 9a2f375: allow combobox inputValue to be controlled
- 9b93961: remove Autocomplete component
- ca1124b: add DataTable column virtualization
- 2927b46: fix bg transition on pinned cell hover
- f42c67f: prevent interactions in dropdown while closing
- 4880293: remove duplicate size sprinkle
- f4ce497: tokenize transition durations
- 9e76f6f: set default toast position to top right corner
- 41338b0: add loading spinner to combobox scroll area
- 76f6a1b: reset combobox inputValue on open
- 0fe0c2a: add loading state for DataTable
- 5f6d146: use switch instead of checkbox in dropdown checkbox item
- e33bfa0: Allow clearing values in DateInput component
- a75c7da: add TableActions component for row actions
- e8ef65f: fix z-index containment within DataTable
- a081773: remove pointer events from toast viewport
- e00b0c7: fix ref for downshift items
- 863b3c0: add DataTable row virtualization
- 000d625: add combobox virtualized component
- 48405c3: add back lg size avatar
- Updated dependencies [f4ce497]
  - @optiaxiom/globals@0.7.4

## 0.13.0

### Minor Changes

- c4ecad3: rename variant prop values of Badge
- d6712dd: add 2xs & remove lg size for avatar

### Patch Changes

- 373849f: fix button size in dialog footers
- e937704: split NavGroupContent from NavList
- 544749b: add generic CardActions container
- 9598d35: update dependencies
- 158fad6: fix TransitionGroup return type
- 3dc9a1d: add Layout Component
- 6874fc2: fix setting href when using asChild
- 27f3acd: update font-size tokens
- 97885d5: refactor disclosure trigger implementation
- 4cbfdb2: fix alert/banner height
- 1d83eb0: rename NavGroupLabel to NavGroupTrigger
- 277fcdc: allow disclosure content transition to be configurable
- 9608cc4: remove aria-label as required prop from NavItem
- ce6a82d: swap border.tertiary and border.default
- eefcd44: add dedicated CardLink component
- Updated dependencies [a18bc51]
- Updated dependencies [9598d35]
- Updated dependencies [27f3acd]
- Updated dependencies [ce6a82d]
  - @optiaxiom/globals@0.7.3

## 0.12.3

### Patch Changes

- 38a3b62: create cjs distribution in addition to esm
- Updated dependencies [38a3b62]
  - @optiaxiom/globals@0.7.2

## 0.12.2

### Patch Changes

- 357c579: allow controlling Field label ID from outside
- bbe6784: improve sidebar toggle a11y
- af9edf7: use proper semantic lists in sidebar nav

## 0.12.1

### Patch Changes

- 2ec3675: rename iconOnly prop to square
- 4487b31: add calendar component
- 4d41aef: add ellipsis menu button
- 3cde382: Add `Card` component
- 3776778: use Transition component for disclosure animation
- 6f597ea: update dependencies
- b40b98b: Add `DateInput` component

## 0.12.0

### Minor Changes

- e7ee36c: Add `DropdownMenuCheckboxItem` component
- 24617af: **Breaking:** rename onClose to onDismiss
- 9f7f9cc: split Sidenav to Sidebar and Nav components
- 68dc5ba: remove support for icon prop in Tabs Trigger

### Patch Changes

- 4e0d75a: global font smoothing for code and related elements
- 833b09e: change default button justify to start
- 761d4cd: remove default transition from spinner
- a0c01dd: fix pointer source for command toggle button
- 4f430bf: grab theme layer name from layers object
- 53cfc13: improve filter for client directive files
- 75136da: improve downshift portal patch hook
- Updated dependencies [53cfc13]
  - @optiaxiom/globals@0.7.1

## 0.11.1

### Patch Changes

- c465c02: fix nested dialog backdrop

## 0.11.0

### Minor Changes

- a89a1d0: simplify DialogHeader component

### Patch Changes

- bc60ff6: fix nested dialog scrolling

## 0.10.1

### Patch Changes

- c547001: fix excluding size prop from combobox content

## 0.10.0

### Minor Changes

- e2534f9: rename border.active to border.control
- 38d6abe: simplify Alert component by replacing Title and Description components with children prop

### Patch Changes

- 9cc5cf9: change dialog body to flex display
- 86f3b97: rename extractSprinkles to extractBoxProps and include className
- 8d1ef5a: swap border.default and border.tertiary
- f50650c: fix dialog cancel button default appearance
- a44c1c0: remove default subtle appearance on ToggleButton
- Updated dependencies [e2534f9]
- Updated dependencies [8d1ef5a]
  - @optiaxiom/globals@0.7.0

## 0.9.0

### Minor Changes

- e999878: rename AlertDialogTitle to AlertDialogHeader
- 1105257: use light-dark() instead of custom dark mode selector

### Patch Changes

- 52bae9a: disable hoverable content for all tooltips
- 5948ae8: add virtualization support to autocomplete
- 96a11b5: pass src directly to SidenavAccountItem
- 69eb0c5: add loading state to dropdown menu content
- 9754969: calculate actual offset based on exiting toasts
- b56d9df: handle nested dialogs gracefully
- 5ec189c: bring back disclosure show/hide animation
- cbe5c2e: always include close button in dialog
- 34f791d: remove secondary tabs
- f14a014: replace framer-motion with native html getAnimations API
- Updated dependencies [9754969]
- Updated dependencies [1105257]
  - @optiaxiom/globals@0.6.0

## 0.8.2

### Patch Changes

- c37670a: use border in separator
- 31e70ed: add link overlay variant
- bb62c91: simplify toaster alternative api signature
- 3e21cd2: rename TableHead to TableHeader
- 2fd175f: replace HoverCard with Tooltip in field info
- 4c41023: update dependencies
- Updated dependencies [bb62c91]
- Updated dependencies [4c41023]
  - @optiaxiom/globals@0.5.1

## 0.8.1

### Patch Changes

- c9b39b9: fix disabled state for disclosure trigger
- 4ae62a7: use darker bg color for skeleton

## 0.8.0

### Minor Changes

- 9422670: remove unused design tokens
- 83938c5: remove so many size tokens
- 6ac4c72: remove named spacing scale
- 219c092: move primitive values to sprinkles only
- d06ae5b: rename 5xl size token to 3xl

### Patch Changes

- b282140: Add `FieldLabel` component
- c273c0f: fix container text colors
- Updated dependencies [9422670]
- Updated dependencies [83938c5]
- Updated dependencies [6ac4c72]
- Updated dependencies [219c092]
- Updated dependencies [d06ae5b]
  - @optiaxiom/globals@0.5.0

## 0.7.8

### Patch Changes

- 87999df: use semi-transparent colors for subtle button hovered/pressed states
- c085827: remove value prop type restriction
- b5be74b: inline packages with peer dependency mismatch
- eed6891: allow showing error outline on input without message
- f7e7c62: fix inline input by using innerText
- a376686: fix indicator prop/ref forwarding
- ab999a5: add avatar fallback icons
- 1278fb2: export re-usable modal component
- Updated dependencies [87999df]
- Updated dependencies [ab999a5]
  - @optiaxiom/globals@0.4.4

## 0.7.7

### Patch Changes

- 905dd68: fix scroll lock issue for combobox popover
- 5710f2b: replace tiptap with native contentEditable implementation
- 103a826: respect externals when bundling types
- 6ad0db8: update dependencies
- Updated dependencies [6ad0db8]
  - @optiaxiom/globals@0.4.3

## 0.7.6

### Patch Changes

- c5c7c2f: add react 19 to peer deps
- f7229d8: fix react server component rendering
- Updated dependencies [c5c7c2f]
  - @optiaxiom/globals@0.4.2

## 0.7.5

### Patch Changes

- d3e5ffc: Fix input focus ring issue in `DialogBody`
- 14e4b82: Fix children styling for `ListboxItem` component
- 9aadb2c: fix accessibility issue for `Breadcrumb` component
- b021488: Prevent user from toggling in `AutocompleteTrigger` disabled state
- 6f29cdd: Remove `BreadcrumbSeparator` component
- 41024af: fix scroll lock issue for custom downshift based popovers
- 8682bea: Add maxW for `TooltipContent`

## 0.7.4

### Patch Changes

- 4964984: remove disclosure show/hide animation
- 543e52e: fix rendering dropdown menu items as links
- da92cac: replace Slottable with decorateChildren util

## 0.7.3

### Patch Changes

- 06435c9: patch vanilla-extract sprinkles package

## 0.7.2

### Patch Changes

- 8189ca0: add missing tiptap pm dependency
- 6549588: close tooltips when opening select menu with keyboard

## 0.7.1

### Patch Changes

- 30e738c: sync color tokens with figma
- Updated dependencies [30e738c]
  - @optiaxiom/globals@0.4.1

## 0.7.0

### Minor Changes

- d1aa0a5: consistent Header/Body/Footer component part names

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
