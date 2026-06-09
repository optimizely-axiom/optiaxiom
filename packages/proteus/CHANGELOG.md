# @optiaxiom/proteus

## 3.0.2

### Patch Changes

- 25dc00c: allow interaction to be an expression
- 82f3c01: Image carousel uses the shared `onPreview` interaction instead of a fullscreen dialog, building each preview file from the metadata the host supplies. Adds the exported `ProteusPreviewFile` type and requires it on carousel items.
- 245282a: allow interaction to be both literal and expression
- 914030b: Add a `Markdown` element that renders markdown content (headings, paragraphs, lists, links, emphasis, inline/fenced code, blockquotes, images, and GFM tables) as Axiom components. The `children` prop accepts a literal string or a `Value` expression.
- de43ed0: add an `interaction` prop to ProteusQuestion. When set, submit and cancel report a structured `{ questions, answers }` payload via the named interaction instead of a text message, so a calling tool can read the answers programmatically. On cancel the payload also flags that the user declined. When omitted, the existing `message` (text transcript) behaviour is used.
- d642d44: add ProteusRichTextEditor wrapper that binds the RichTextEditor into the Proteus document form-data context, renderable via `$type: "RichTextEditor"`
- Updated dependencies [14c481e]
- Updated dependencies [1ce9d81]
- Updated dependencies [d642d44]
- Updated dependencies [fe13695]
- Updated dependencies [56497cc]
- Updated dependencies [fbf4855]
- Updated dependencies [992917f]
- Updated dependencies [fa0e6f0]
  - @optiaxiom/react@3.0.3

## 3.0.1

### Patch Changes

- 9864a99: re-generate schema
- Updated dependencies [9625e6f]
- Updated dependencies [bc01b23]
  - @optiaxiom/react@3.0.2

## 3.0.0

### Major Changes

- 5a7bc62: Promote packages to v3 to align major version numbers across the Axiom ecosystem. No code changes — this release exists solely to give every public package a stable `^3` install range alongside `@optiaxiom/react@^3`.

### Minor Changes

- 61612f6: Add first-class list mutation primitives:

  - `pushValue` / `removeValue` event handler actions, interpreted by the
    runtime, for appending to and removing from arrays in form data.
  - `Length` value expression (`{ $type: "Length", path }`) for reading array
    length in conditions and values.
  - `MapIndex` and `Length` are now renderable elements (not just value
    expressions), consistent with `Value`.
  - `Input` with an empty `name` now binds to the current `parentPath`, enabling
    rows inside a `Map` to read/write the current array element.

- 1f06d43: Change `onDataChange` to receive a functional updater `(prev) => next` (the
  shape React's `setState` accepts) instead of the full next data object. This
  lets rapid successive form mutations compose without losing writes.

  Migration: hosts that pass a `useState` setter directly
  (`onDataChange={setData}`) need no change. Hosts that wrap it
  (`onDataChange={(data) => …}`) must accept an updater instead:
  `onDataChange={(updater) => setData(prev => updater(prev))}`.

### Patch Changes

- d482376: add more form controls to proteus
- 3a5d588: add icon, disabled, and aria-label props to Action/Button (and filled prop to Icon)
- Updated dependencies [5a2c623]
  - @optiaxiom/react@3.0.1

## 0.3.0

### Minor Changes

- 05cb2e0: Add v3 tokens to schema (additive): new bg.pill.\*, fg.black, heading font family, 900 font weight.

### Patch Changes

- Updated dependencies [9657e42]
- Updated dependencies [f597c7d]
- Updated dependencies [ee1ccc2]
  - @optiaxiom/react@3.0.0

## 0.2.16

### Patch Changes

- f39c335: hide shell for inline appearance

## 0.2.15

### Patch Changes

- e9bf554: explicit inline appearance for cards
- c7801df: `ProteusFileUpload`: surface a warning toast naming the number of dropped files when the selection would exceed `maxFiles`, instead of silently discarding them. The allowed files still upload as before.
- 3d0b1de: fix handling text mime type better

## 0.2.14

### Patch Changes

- ba73551: add present_files story for proteus
- Updated dependencies [ba73551]
  - @optiaxiom/react@1.9.36

## 0.2.13

### Patch Changes

- 77f6726: Bump module federation version to 0.19.1
- be00a09: Remove unused @modelcontextprotocol/sdk dependency
- Updated dependencies [6a45aca]
  - @optiaxiom/icons@1.1.3

## 0.2.12

### Patch Changes

- d6cf2ba: Add multi-file upload support to the file upload component, replace the required flag with minimum and maximum file count, let map flatten nested results, and have the file list remove handler pass the file item instead of its index.
- 66fc393: retuns file upload metadata object instead of string
- Updated dependencies [d6cf2ba]
- Updated dependencies [2c372f4]
  - @optiaxiom/react@1.9.35

## 0.2.11

### Patch Changes

- 1fba745: add meta and data fields to document
- Updated dependencies [68388a3]
  - @optiaxiom/react@1.9.34

## 0.2.10

### Patch Changes

- 090c4a8: Add Proteus Federated Component
- Updated dependencies [73bf7d0]
- Updated dependencies [3bae10a]
  - @optiaxiom/react@1.9.33

## 0.2.9

### Patch Changes

- 53208bf: allow opening external links in proteus

## 0.2.8

### Patch Changes

- 0aacf42: fix chart series colors

## 0.2.7

### Patch Changes

- ce70d32: fixes ProteusFileUploads required tag
- a9357b8: add package.json self-reference exports to packages
- Updated dependencies [a9357b8]
  - @optiaxiom/icons@1.1.2
  - @optiaxiom/react@1.9.32

## 0.2.6

### Patch Changes

- 2e52b79: safeguard against null props
- 9f90338: adds ProteusFileUpload element
- Updated dependencies [8aa5788]
  - @optiaxiom/react@1.9.31

## 0.2.5

### Patch Changes

- c43afe1: allow dynamic expressions for chart series
- 2e6b649: disable dragging of image slides
- 925bf58: fix bridge API
- Updated dependencies [df00f36]
  - @optiaxiom/react@1.9.30

## 0.2.4

### Patch Changes

- 73159b0: allow expression in table column configuration

## 0.2.3

### Patch Changes

- 030dfa5: fix tooltip z-index
- 2cc2bf4: change dependency on react and icons to version range

## 0.2.2

### Patch Changes

- Updated dependencies [b459535]
  - @optiaxiom/react@1.9.29

## 0.2.1

### Patch Changes

- eb59439: render chart tooltip via portals
- 62cbb1b: fix hard coded colors in chart
- fe4ab70: truncate long labels

## 0.2.0

### Minor Changes

- 6c3250e: adds onTrack prop for analytics tracking

### Patch Changes

- Updated dependencies [bf96c0a]
  - @optiaxiom/react@1.9.28

## 0.1.26

### Patch Changes

- Updated dependencies [87d7a9c]
  - @optiaxiom/icons@1.1.1

## 0.1.25

### Patch Changes

- 6305936: Add Bridge component for rendering MCP apps via iframe
- 13d0cc1: update icon import names
- Updated dependencies [7c51620]
- Updated dependencies [babaea0]
- Updated dependencies [79561f1]
  - @optiaxiom/react@1.9.27
  - @optiaxiom/icons@1.1.0

## 0.1.24

### Patch Changes

- 0e5e9a1: add compact body support to proteus document shell

## 0.1.23

### Patch Changes

- e92056b: simplify proteus button

## 0.1.22

### Patch Changes

- 15f5398: add horizontal bar charts

## 0.1.21

### Patch Changes

- 4de6dc5: update dependencies
- Updated dependencies [ae5e8f8]
- Updated dependencies [ff7bdef]
- Updated dependencies [4de6dc5]
- Updated dependencies [e5340fe]
  - @optiaxiom/icons@1.0.0
  - @optiaxiom/react@1.9.26

## 0.1.20

### Patch Changes

- f3a9ce9: design feedback

## 0.1.19

### Patch Changes

- 5df5a11: fix download for carousel

## 0.1.18

### Patch Changes

- ed78c5c: add onDownload prop to proteus

## 0.1.17

### Patch Changes

- f7f9220: Remove tree walker auto-focus from ProteusDocumentShell
- b6f1eb7: add MapIndex to allow index based logic within loops

## 0.1.16

### Patch Changes

- a6fffc6: bump up padding of action card
- 1800f82: Fix escape key in Question component to skip directly when no user interaction occurred.
- 2b8907e: Auto-focus first interactive element in Proteus documents on mount.
- 3e7a35f: add proteus image carousel
- 7e1ca0a: render CardLink with `target=_blank` by default
- Updated dependencies [0fd224c]
- Updated dependencies [c04d42e]
  - @optiaxiom/react@1.9.25
  - @optiaxiom/icons@0.1.4

## 0.1.15

### Patch Changes

- Updated dependencies [83105d7]
  - @optiaxiom/react@1.9.24
  - @optiaxiom/icons@0.1.3

## 0.1.14

### Patch Changes

- c1af0d0: support autoFocus prop for Input
- 7ba5602: Update question card design with dismiss button, keyboard support, and separator styling
- Updated dependencies [29f5e2a]
  - @optiaxiom/icons@0.1.2
  - @optiaxiom/react@1.9.23

## 0.1.13

### Patch Changes

- 3ecbf36: proper type on action buttons
- 6e13769: rename onToolCall to onInteraction

## 0.1.12

### Patch Changes

- daf736e: only disable primary action buttons when form is invalid

## 0.1.11

### Patch Changes

- 27f54fa: fix title icon gap and size in document shell

## 0.1.10

### Patch Changes

- 73f8309: allow image object-fit customization
- Updated dependencies [2721b28]
  - @optiaxiom/react@1.9.22

## 0.1.9

### Patch Changes

- e4fb348: simply open in new tab for download

## 0.1.8

### Patch Changes

- 438bf65: handle falsy answers better

## 0.1.7

### Patch Changes

- d56fec5: allow resolving Show in prop
- b345e37: add new Concat type

## 0.1.6

### Patch Changes

- f444bda: allow batch download of multiple files
- 21c25dc: move actions inside main form

## 0.1.5

### Patch Changes

- aba28a1: include card image

## 0.1.4

### Patch Changes

- 6e677ec: allow image dnd
- 1c8a580: allow setting max-height on image
- Updated dependencies [1c8a580]
  - @optiaxiom/react@1.9.21

## 0.1.3

### Patch Changes

- 1d45d77: add AskAgentInput story
- 2db55bd: export useProteusValue hook
- Updated dependencies [1d45d77]
  - @optiaxiom/react@1.9.20

## 0.1.2

### Patch Changes

- 38fe2d0: show fullscreen preview for image
- 0592f99: allow empty title for proteus cards

## 0.1.1

### Patch Changes

- 4577299: add other option and disable buttons until filled out
- 172d250: relax version constraint on tanstack table
- 52c9599: replace input with inline input
- cd38713: move next/previous to top right
- Updated dependencies [52c9599]
  - @optiaxiom/react@1.9.19

## 0.1.0

### Minor Changes

- 3faa23b: split proteus into separate package

### Patch Changes

- 713fbe6: replace choice with tailored question component
- dbaef5f: fix download logic to forward cookies
- Updated dependencies [3faa23b]
- Updated dependencies [c2e3650]
  - @optiaxiom/react@1.9.18
