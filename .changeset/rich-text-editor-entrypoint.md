---
"@optiaxiom/react": patch
"@optiaxiom/proteus": patch
"@optiaxiom/web-components": patch
---

move `RichTextEditor` to its own entrypoint so importing from the main barrel no longer pulls in `@tiptap/*`. Consumers who don't use the editor no longer need the tiptap peer dependencies (now marked optional). Import the editor via `import { RichTextEditor } from "@optiaxiom/react/editor"`. Also corrected the `@optiaxiom/react/css-runtime` CommonJS export to point at the file that is actually built.

`ax-rich-text-editor` is removed from `@optiaxiom/web-components` for now while the editor lives behind the dedicated entrypoint.
