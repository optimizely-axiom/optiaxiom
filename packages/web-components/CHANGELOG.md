# @optiaxiom/web-components

## 0.11.16

### Patch Changes

- 75b4e29: add metadata to components and improve the docs

## 0.11.15

### Patch Changes

- d953f11: handle scroll locking when menu is used within a modal
- 2fd2dac: allow disableHoverableContent prop on Tooltip

## 0.11.14

### Patch Changes

- f89c0c2: update readonly and disabled input colors to match figma

## 0.11.13

### Patch Changes

- a5ae472: fix overflow scroll issue with visually hidden elements

## 0.11.12

### Patch Changes

- e407698: allow selecting text in menu filter
- b18c6f9: date input improve invalid date handling

## 0.11.11

### Patch Changes

- 520c3a8: optimize table rendering when switching to virtualization
- 83e6cd8: use row and column ID for virtualization item keys

## 0.11.10

### Patch Changes

- fbf8bdc: fix detecting sortable/resizable columns

## 0.11.9

### Patch Changes

- 6c7df42: allow setting placeholder date/time for DateInput

## 0.11.8

### Patch Changes

- ac74aed: animate primary opal button bg

## 0.11.7

### Patch Changes

- 8c676a2: enable asChild by default in TableAction and DataTableAction

## 0.11.6

### Patch Changes

- 74979dd: allow light dismiss of spotlight and menu dialog
- bdb3768: use top row alignment for listbox item

## 0.11.5

### Patch Changes

- 73b542a: update dependencies
- 4ed6b33: fix detail grow/shrink for menu items
- 6eb3aa8: add secondary opal button appearance
- 5f27edb: allow external links in menu items
- f70f6a2: fix gap for tanstack virtual
- 200282d: disable light dismiss of dialogs by default

## 0.11.4

### Patch Changes

- 842dd28: use stable useControllableState setter in date range picker

## 0.11.3

### Patch Changes

- 0f59865: allow easily selecting month/year from calendar picker
- 138dc95: fix handling space to select for links
- 267cb13: add mod modifier to kbd component

## 0.11.2

### Patch Changes

- 1574d8f: handle readOnly state of DateInput
- b321bba: allow react node in menu item detail
- 0d99111: fix pinned cell background of selected rows

## 0.11.1

### Patch Changes

- 8ba9cbe: easily allow selecting single date range
- 88f5a36: restrict badge width to fix shape for narrow content
- 7ed9442: update dependencies

## 0.11.0

### Minor Changes

- c6885f2: release Card to stable
- 29936a1: release Menu component
- 0097e73: truncate button label
- fa02fbf: release Breadcrumb to stable

### Patch Changes

- 5c62008: hard-code dark mode colors for opal gradient
- c629797: always show tooltip trigger
- 9ed0238: remove default alert icon from AlertDialog

## 0.10.14

### Patch Changes

- 248edc5: fix textarea scrollbar for manual resize

## 0.10.13

### Patch Changes

- a0996f4: allow disclosure to always be present in DOM
- 4e6b3e0: directly render PopperAnchor
- a45b96a: shake alert dialog when trying to dismiss with overlay

## 0.10.12

### Patch Changes

- dd91307: fix sidebar non-collapsible group label alignment
- c2df343: keep toasts positioned correctly on scroll lock
- 499c1d1: fix overflow for maxRows and auto sizing textarea
- 43a55fd: fix default spinner vertical alignment

## 0.10.11

### Patch Changes

- 1b15ce5: remove default justify-content from Flex
- 5bdbc83: apply autoprefixer postcss plugin
- fa12c0e: disable selection of text inside badges
- 85d7236: allow switch toggle inside menu items

## 0.10.10

### Patch Changes

- 45a597b: fix switch hover color

## 0.10.9

### Patch Changes

- fd5c164: a11y fixes
- c6f3e31: add opal variants to components
- 7150d90: fix nested TransitionGroup closing
- 511d99c: manually scroll selected item into view after mount

## 0.10.8

### Patch Changes

- 292edd1: simply remove TooltipTrigger when tooltip is disabled or empty
- fa86de1: allow composing tabs trigger using asChild
- eb9f70a: update dependencies

## 0.10.7

### Patch Changes

- ddd25e3: restrict min-height of calendar when inside popover placed on top
- d0004a1: use onPointerMove to disable tooltip trigger
- bfd8dca: fix table action focus on initial render

## 0.10.6

### Patch Changes

- 0c2e4d5: remove minW=trigger from all popovers except Select
- b14e956: freeze children when closing TransitionGroup

## 0.10.5

### Patch Changes

- 95ffd99: add DataTableAction for primary/secondary actions
- 68adb62: rename Link overlay prop to cover
- e1da995: update dependencies
- 48373ac: bump down indicator size for today on calendar
- d9ea02b: forward non style/sprinkle props to inner table instance
- 9cb019b: allow packages to work in legacy CJS environments
- f0eeb7a: add DataTableLabel to label rows for a11y
- d22bb5a: allow whole row to be selectable in DataTable
- 4e1ffa0: handle line-clamp for tooltip clipping detection
- 61af1a9: add onValueChange prop to input
- 0fca0f9: simplify transition types

## 0.10.4

### Patch Changes

- f440bca: fix regression from portal refactor
- f04c828: allow configuring NavGroup to be collapsible
- 29a2bf1: handle SubNav item not having icon

## 0.10.3

### Patch Changes

- 5185772: add aria attributes to support virtualized listbox

## 0.10.2

### Patch Changes

- caa7d34: fix detecting group/separator options in ListboxItemized

## 0.10.1

### Patch Changes

- 1df8b2b: make portal context optional
- 4e64ba7: calculate correct flex ratio of columns
- 1bb3b18: use skeleton loader in menu and select

## 0.10.0

### Minor Changes

- 9b3d39b: move Select to stable
- 5b87c01: move DateInput and DateRangePicker to stable

### Patch Changes

- c2a4488: export Cover component
- b00fa51: gracefully handle rendering inside shadow DOM
- 9d6f0bf: move Table and DataTable out of alpha
- 913b147: fix initial highlight index
- 55ed612: fix downshift web-components exports
- d142cc5: improve detection of addon click in input

## 0.9.7

### Patch Changes

- 39ca264: do not remove UA buttons/icons from inputs by default

## 0.9.6

### Patch Changes

- abaf1fd: update dependencies

## 0.9.5

### Patch Changes

- 42431fa: handle long text inside disclosure trigger

## 0.9.4

### Patch Changes

- 61afcf3: give avatar children priority as fallback over initials

## 0.9.3

### Patch Changes

- be16d0c: collapse portal and toast viewport element
- cd61f1d: fix nested dropdown open state
- 4b488b7: observe value of DateInput and SearchInput

## 0.9.2

### Patch Changes

- dd09828: fix dropdown highlight

## 0.9.1

### Patch Changes

- ebc3141: include more form related native prop types when building components
- eac251d: do not use controlled value for SearchInput
- be5d476: hydrate value while component is being built
- 53c3af1: fix parsing string prop types

## 0.9.0

### Minor Changes

- ecd95b4: remove default font-size from Text component

### Patch Changes

- 3533644: update dependencies

## 0.8.18

### Patch Changes

- 0323fb3: use full component name in context providers and consumers

## 0.8.17

### Patch Changes

- 3c0c3af: fix html attribute prop types for components

## 0.8.16

### Patch Changes

- e48e274: skip waiting for animation in toaster queue

## 0.8.15

### Patch Changes

- f6e25e1: remove invalid align-items values
- 66a3a34: fix sidebar nav group padding
- 47e36be: add flex-start/flex-end to justifyContent
- b03d0bf: remove unused empty sprinkle
- 1961b53: set font-family via css var

## 0.8.14

### Patch Changes

- 4070e40: sync disclosure spec with figma
- c2bf8b6: fix button alignment

## 0.8.13

### Patch Changes

- 219b810: promote secondary nav components to stable

## 0.8.12

### Patch Changes

- 54dae70: fix appending addonBefore in SearchInput

## 0.8.11

### Patch Changes

- 89b65db: remove Drawer component

## 0.8.10

### Patch Changes

- be08e41: fix disclosure trigger size

## 0.8.9

### Patch Changes

- 1e5d206: fix attaching event listener props
- 78cfcbb: fix traversing parent from within shadow dom

## 0.8.8

### Patch Changes

- f195018: fix responsive box prop types

## 0.8.7

### Patch Changes

- 7a67f59: handle non-string properties on custom elements
- 0a33d26: properly add component jsx typings for stencil

## 0.8.6

### Patch Changes

- a2e5ec7: use context to conditionally enable modal layer

## 0.8.5

### Patch Changes

- e1eee45: refactor presence of popovers

## 0.8.4

### Patch Changes

- 4880293: remove duplicate size sprinkle
- 9e76f6f: set default toast position to top right corner
- 5f6d146: use switch instead of checkbox in dropdown checkbox item
- 48405c3: add back lg size avatar

## 0.8.3

### Patch Changes

- 373849f: fix button size in dialog footers
- e937704: split NavGroupContent from NavList
- 9598d35: update dependencies
- c5256f1: add form controls to input web components
- 97885d5: refactor disclosure trigger implementation
- 4cbfdb2: fix alert/banner height
- 1d83eb0: rename NavGroupLabel to NavGroupTrigger
- 277fcdc: allow disclosure content transition to be configurable
- 2b1262d: generate type declarations for web components
- ce6a82d: swap border.tertiary and border.default

## 0.8.2

### Patch Changes

- af9edf7: use proper semantic lists in sidebar nav

## 0.8.1

### Patch Changes

- 2ec3675: rename iconOnly prop to square
- 4487b31: add calendar component
- 4d41aef: add ellipsis menu button
- 3776778: use Transition component for disclosure animation
- 6f597ea: update dependencies

## 0.8.0

### Minor Changes

- 24617af: **Breaking:** rename onClose to onDismiss
- 9f7f9cc: split Sidenav to Sidebar and Nav components

### Patch Changes

- 4e0d75a: global font smoothing for code and related elements
- 833b09e: change default button justify to start
- 75136da: improve downshift portal patch hook

## 0.7.1

### Patch Changes

- c465c02: fix nested dialog backdrop

## 0.7.0

### Minor Changes

- a89a1d0: simplify DialogHeader component

### Patch Changes

- bc60ff6: fix nested dialog scrolling

## 0.6.0

### Minor Changes

- 38d6abe: simplify Alert component by replacing Title and Description components with children prop

## 0.5.0

### Minor Changes

- e999878: rename AlertDialogTitle to AlertDialogHeader
- 1105257: use light-dark() instead of custom dark mode selector

### Patch Changes

- 52bae9a: disable hoverable content for all tooltips
- f14a014: replace framer-motion with native html getAnimations API

## 0.4.1

### Patch Changes

- 4c41023: update dependencies

## 0.4.0

### Minor Changes

- 9422670: remove unused design tokens

## 0.3.1

### Patch Changes

- 6ad0db8: update dependencies

## 0.3.0

### Minor Changes

- d1aa0a5: consistent Header/Body/Footer component part names

## 0.2.1

### Patch Changes

- efbe5c7: support declarative shadow dom

## 0.2.0

### Minor Changes

- 21e0e25: rename SideNav to Sidenav

## 0.1.5

### Patch Changes

- 424600b: added `DropdownMenuGroup` component

## 0.1.4

### Patch Changes

- 5e965c5: fix focus trapping in web-components

## 0.1.3

### Patch Changes

- 0947781: skip rendering empty children in web components
- de8b190: handle case where assigned element is not a shadow host
- ce357c4: add module field to package.json for backwards compatibility

## 0.1.2

### Patch Changes

- 19c9c25: fix dropdown menu focus trap
- e78e16f: fix styling for named slots
- 7a968d2: use events to correctly bridge web-component islands

## 0.1.1

### Patch Changes

- ad507ac: fix dropdown menu keyboard interactions

## 0.1.0

### Patch Changes

- fe9557e: rename decorators to addons
- 1055c78: load tokens and fonts once
- 44d461e: allow custom events on web-components
- d9032a3: add web-components package
- eaea0f9: only inject font-face styles in global
- 218d9cd: add support for rendering portals
- de49878: release all components in react
- 50a4805: rename input decorator prop
- 218d9cd: render web component tree in order

## 0.1.0-next.8

### Patch Changes

- fe9557e: rename decorators to addons

## 0.1.0-next.7

### Patch Changes

- 1055c78: load tokens and fonts once

## 0.1.0-next.6

### Patch Changes

- eaea0f9: only inject font-face styles in global

## 0.1.0-next.5

### Patch Changes

- 44d461e: allow custom events on web-components

## 0.1.0-next.4

### Patch Changes

- 218d9cd: add support for rendering portals
- 218d9cd: render web component tree in order

## 0.1.0-next.3

### Patch Changes

- 50a4805: rename input decorator prop

## 0.1.0-next.2

### Patch Changes

- de49878: release all components in react

## 0.1.0-next.1

### Patch Changes

- d9032a3: add web-components package
