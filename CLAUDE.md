# CLAUDE.md

Guidance for AI agents working in this repo. See [PHILOSOPHY.md](./PHILOSOPHY.md) for design
principles. For the full review reasoning, examples, and long-tail conventions, use the
`optiaxiom-review` skill — this file is the condensed, enforceable subset.

> Before citing an exact prop name, token, sprinkle value, or import path, verify it against the
> current codebase (`packages/react/src/sprinkles/properties.css.ts`, the component source,
> `package.json`). The rules below are stable; specific names and values change.

## Before changing a package

Always read the `README.md` in the specific package or app directory you're working in for
package-specific setup, testing, and conventions.

- `apps/docs/` — documentation site (see `apps/docs/README.md` for doc writing guidelines)
- `packages/react/` — React component library
- `packages/mcp/` — MCP server for AI assistants

## Changesets (REQUIRED for every user-facing change)

Any change that affects a published package's consumers **must** include a changeset, or the PR is
incomplete. This is the most commonly missed step — check for it on every review.

- Add one with `pnpm changeset` (or create a file under `.changeset/`).
- Published packages that need changesets: `@optiaxiom/react`, `@optiaxiom/web-components`,
  `@optiaxiom/globals`, `@optiaxiom/icons`, `@optiaxiom/proteus`, `@optiaxiom/mcp`,
  `@optiaxiom/codemod`. (`@optiaxiom/shared` is private — no changeset.)
- A change to a component often needs entries for **both** `react` and `web-components`.
- Semver (the repo is past v1): `patch` = fixes, `minor` = backwards-compatible features,
  `major` = breaking changes.
- Write the summary for **consumers**, present tense and specific ("added `X` to `Y` via `prop`"),
  not a description of the code change.
- A follow-up to a feature that hasn't been released yet may not need its own changeset.

## Component conventions

**API & props**

- Native HTML attribute names: `disabled` not `isDisabled`, `error` not `isInvalid`.
- `intent` (color) + `variant` (fill: `strong`/`subtle`/`outline`) are the styling axes — not
  `colorScheme`. `appearance` is a preset shortcut only for fixed-combo components (Button).
- Dash-case prop values (`"danger-outline"`). Don't initialize falsy defaults. Aim for ~5 props max —
  break into composable sub-components beyond that.
- Extend `BoxProps`/`TextProps<...>`; don't re-declare props the base already supplies. Pick specific
  props from primitives (`Pick<…, "open">`) rather than spreading a whole Root. Reuse upstream types;
  don't re-export them. Prefer a generic `Item` over `unknown` casts.
- Support controlled + uncontrolled where applicable (`defaultX`/`x`/`onXChange`, or
  `useControllableState`). Don't add props for things CSS/media queries handle, or expose internal
  toggles consumers shouldn't touch.
- Name after the primitive / ecosystem (`Progress` not `ProgressBar`; `Field` not `FormField`).
  Icons get an `Icon` prefix.

**Composition**

- Spread `{...props}` onto the outer `Box`/`Text`; only `ref` + element-specific props (`disabled`,
  `id`) go on the inner primitive. Don't reintroduce a manual sprinkle-extraction split.
- Put `{...styles.x()}` / `data-*` **before** `{...props}` so consumers can override.
- Don't wrap virtual Radix elements (`Portal`/`Root`) in a `Box`; `Root` can't take a `ref`.
- Reuse existing components over raw styles (`<Heading level>`, `<Paper>`, `<Button>`).
- Use **context** to pass state to children, not `Children.map`/`cloneElement`.
- `asChild`/`Slot` only when consumers will realistically swap the element.

**Styling (vanilla-extract / sprinkles)**

- Tokens come through `theme` (from `@optiaxiom/globals`) inside `.css.ts` — never a bare token string
  in `style()`. In `.tsx`, use native sprinkle props, not `sprinkles()` + `className`.
- If styles are just sprinkles, inline them in the `.tsx` — no `.css.ts` file.
- **Spacing** (`gap`/`p*`/`m*`) uses numeric pixel tokens (`gap="8"`), NOT t-shirt names.
  **Dimensions** (`size`/`w`/`h`) and `borderRadius` use t-shirt tokens. No hard-coded numbers/colors;
  use `surface` not `white`; `z` from the token scale.
- Empty variant branches are `{}`, not `style({})`. Don't mix `style()` and sprinkle props in one
  recipe entry. CSS vars get a `Var` suffix; cross-component selectors use a scoped marker class.

**Stories**

- First/default story is named `Basic`. Use `args`, not `render`, where possible. One concern per
  story. Don't hand-specify what Storybook auto-detects (`component`/`title`/`argTypes`/`layout`).
  In-development components import from `@optiaxiom/react/unstable`.

**Accessibility**

- Real `<button>` for any interactive trigger (keyboard/focus/SR) — don't style a `div`.
- `fill="currentColor"` on icon SVGs; meaningful `aria-label`s. Generate `id` with `useId` — never
  require an `id` prop. Style off `data-*` attributes; `aria-*` expresses intent.

**Housekeeping**

- No `eslint-disable` unless unavoidable. Components/types `PascalCase`, everything else `camelCase`
  (ideally one word), directories `kebab-case`.
- One thing per PR — drop unrelated commits/changes; keep the diff minimal.
- Dependencies go in the owning workspace's `package.json`, not the root.
- New components must be wired into `index.ts`/`unstable.ts` **and** `packages/web-components/package.json`.
