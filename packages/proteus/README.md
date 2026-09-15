# @optiaxiom/proteus

Renderer for **Proteus documents** — JSON descriptions of a UI (typically produced by an LLM or a
tool/MCP server) that this package validates and renders with `@optiaxiom/react` components.

The package ships two things that must stay in sync:

- the **renderer** (React components that turn `{ "$type": "..." }` nodes into Axiom components), and
- the **spec** (a JSON Schema describing every element and prop, published for document authors and
  model tooling).

## Entry points

| Import                    | Contents                                                                     |
| ------------------------- | ---------------------------------------------------------------------------- |
| `@optiaxiom/proteus`      | `ProteusDocumentRenderer`, `ProteusDocumentShell`, element components, hooks |
| `@optiaxiom/proteus/spec` | `schema` — the public JSON Schema (`src/schema/public-schema.json`)          |

Most hosts only need `ProteusDocumentRenderer` (validates, then renders) or `ProteusDocumentShell`
(renders an already-parsed document).

## How a document renders

1. `ProteusDocumentRenderer` calls `safeParseDocument` (`src/proteus-document/schemas.ts`), which
   validates against `runtime-schema.json` with `@cfworker/json-schema`. Invalid documents render
   nothing, or throw when `strict`.
2. `ProteusDocumentShell` owns the chrome (disclosure, title, actions, form element), the form
   `data`, the event dispatcher (`onEvent`), and the theme override. It publishes all of it through
   `ProteusDocumentProvider`.
3. `ProteusElement` (`src/proteus-element/ProteusElement.tsx`) is the dispatcher: it re-validates
   each node, resolves every prop through `resolveProteusProp`, then switches on `$type` to render
   either a plain Axiom component or a `Proteus*` wrapper.
4. Wrappers live one per directory (`src/proteus-select/`, `src/proteus-map/`, …) and exist whenever
   an element needs behaviour beyond "spread resolved props onto an Axiom component" — data binding,
   iteration, async work.

## The schema is generated — read this before editing props

`src/schema/*.json` are **generated at build time** and committed. CI runs
`git diff --exit-code` on them, so a changed input with a stale output fails the build.

- Element/prop surface is declared in `PROTEUS_COMPONENT_CONFIG` in
  `plugins/rollup-plugin-generate-schema.mjs`: `allowedProps`, optional `extends` (the Axiom
  component whose documented props are pulled in — `"Fragment"` means "no Axiom base, no sprinkle
  props"), `requiredProps`, and `example` (used by designer/insert tooling).
- Prop types come from `@optiaxiom/shared`'s generated docs for the base component. Anything that
  can't be derived — event handlers, `$ref`s, hand-written descriptions — goes in
  `getPropTypeOverrides()` in the same file. An `allowedProps` entry that resolves to neither throws
  at build time.
- A prop that may hold a literal **or** an expression must be
  `anyOf: [{ <literal type> }, { $ref: "#/definitions/ProteusExpression" }]`. `ProteusExpression`
  alone rejects literals.
- The two outputs come from the same generator: `generateSpec(true)` for `runtime-schema.json`
  (permissive, tolerates unknown props from newer producers) and `generateSpec(false)` for
  `public-schema.json` (strict, what document authors validate against).

Rebuild with `pnpm --filter @optiaxiom/proteus build` (or `pnpm dev` for watch mode) and commit the
resulting JSON in the same change.

## Adding a new element

1. Create `src/proteus-<name>/Proteus<Name>.tsx` + `index.ts` (kebab-case directory, `PascalCase`
   component, `displayName = "@optiaxiom/proteus/Proteus<Name>"`). Skip the wrapper entirely if the
   Axiom component can be rendered directly from resolved props.
2. Export it from `src/index.ts` if hosts should be able to import it.
3. Register the `$type` in `src/proteus-element/ProteusElement.tsx`. Lazy-import heavy dependencies
   (see `ProteusChart`).
4. Add a `PROTEUS_COMPONENT_CONFIG` entry (and `getPropTypeOverrides()` entries for anything not
   derivable) in the schema generator.
5. Rebuild and commit the regenerated `src/schema/*.json`.
6. Add a story in `apps/storybook/src/components/ProteusDocumentRenderer.stories.tsx`, and a demo
   under `apps/docs/demos/proteus/` plus a section in `apps/docs/app/(docs)/guides/proteus/page.mdx`
   if it's part of the documented surface.
7. Add a changeset (`@optiaxiom/proteus`).

## Adding or changing an event handler

Event handlers (`onClick`, `onInputValueChange`, …) all take a `ProteusEventHandler`. Adding a
variant touches three places:

1. The union in `src/proteus-document/schemas.ts`.
2. The dispatch chain in `ProteusDocumentShell`'s `onEvent` — either handle it locally (data
   operations use `onDataChange` with a functional updater) or forward it to a host callback prop.
3. The `ProteusEventHandler` definition in the schema generator, then rebuild.

Host callbacks are props on the shell (`onInteraction`, `onMessage`, `onDownload`, `onOpenLink`,
`onPreview`, `onRequestModal`, `onTrack`, `onUpload`). Client-side actions (`setValue`, `pushValue`,
`removeValue`, `download`, `openLink`) are handled in-package; only `interaction` returns a value to
the caller.

## Data binding

Form state is a plain object owned by the host and passed as `data`; writes go through
`onDataChange((prev) => next)`. Elements bind to it by JSON pointer:

- `{ "$type": "Value", "path": "/x" }` reads a value; relative paths resolve against the current
  `Map` item or `DataTable` row via `ProteusDocumentPathContext` / `ProteusDataTableRowContext`.
- `Map` iterates, `MapIndex` yields the current index, `Length` counts, `Show` evaluates a
  `ProteusCondition`.
- Inside components use `useProteusValue({ path })` to read and `useResolveProteusValues` to resolve
  a whole object of props; never reach into `data` directly.

## Scripts

`document.scripts` is a map of module name to JavaScript source, run in a sandboxed Web Worker
(`src/proteus-script/`). Handlers registered with `register(name, fn)` are triggered by
`{ script: "module:handler", params }` and receive a `ctx` (`emit`, `getValue`, `params`). `ctx.emit`
re-dispatches through the same `onEvent`, so scripts gain no capability the document doesn't already
have — but they are not a security boundary, so treat `scripts` with the same trust as the document.

## Testing and previewing

There are no unit tests in this package. Exercise changes through:

- `apps/storybook` — `ProteusDocumentRenderer.stories.tsx` (the main fixture set; also
  `src/fixtures/federated-widget/` for the federation path).
- `apps/docs` — `demos/proteus/*` rendered by the guide at `app/(docs)/guides/proteus/page.mdx`.

Run `pnpm lint` (it type-checks too, and rewrites import/key ordering) from the repo root before
committing.

## Conventions

- Follow the repo-wide rules in the root `CLAUDE.md` — sprinkle props over `.css.ts` for
  sprinkle-only styling, numeric spacing tokens, t-shirt dimension tokens, `{...props}` spread onto
  the outer `Box`.
- Keep element props close to the Axiom prop they map to; don't invent Proteus-only names when the
  underlying component already has one.
- Every user-facing change needs a changeset for `@optiaxiom/proteus`.
