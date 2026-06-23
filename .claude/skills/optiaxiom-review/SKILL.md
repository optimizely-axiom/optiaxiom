---
name: optiaxiom-review
description: Code review conventions and standards for the optiaxiom (@optiaxiom/react) design-system repo. Consult whenever reviewing a PR, reviewing changes, or self-reviewing a branch in this repo, and when writing or changing a component, story, recipe, or token so the change matches the repo's conventions before review.
---

# Optiaxiom Code Review

You are reviewing code for **@optiaxiom/react**, a React design system built on Radix primitives (plus `downshift` for comboboxes/select, `react-day-picker` for calendar, `@tanstack` for virtual/table), vanilla-extract (`recipe`/`style`/`sprinkles`), and a `Box`/`Flex`/`Text` styling layer. This skill encodes the repo's review priorities and conventions.

> **Before citing an exact prop name, token, sprinkle value, or import path in a review, verify it against the current codebase** — `grep` the sprinkle defs in `packages/react/src/sprinkles/properties.css.ts`, the component source, and `package.json`. The principles here are stable, but specific names and values change.

> The condensed, enforceable subset of these rules lives in the repo root [CLAUDE.md](../../../CLAUDE.md) — that's what loads every session and what the generic `/code-review` engine checks diffs against. This skill is the full reference: reasoning, examples, and long-tail conventions. Keep the two in sync when conventions change.

## How to run a review

1. Get the diff: `gh pr diff <number>` (or review the working tree).
2. Walk every changed file against the **checklists** below, in roughly this priority order: API design → composition/forwarding → styling system rules → naming → stories → a11y → housekeeping.
3. Write findings as **inline, specific, actionable** comments. Prefer a `suggestion` block with the exact replacement code over prose. One concern per comment.
4. Lead with the _why_ when it's non-obvious — explain the reasoning, not just the rule.
5. Post with `--comment` only if asked; otherwise present findings grouped by file.

## How to write the comments

- Short, direct, friendly. Suggest collaboratively rather than command ("let's …", "can we …?"), question rather than assert ("why do we need this?", "this doesn't look right"), and flag anything unnecessary ("we don't need this").
- Always suggest the fix, don't just flag the problem. Use ` ```suggestion ` blocks heavily.
- Explain the reasoning for anything architectural ("the reason being…", "that way…", "otherwise…").
- It's fine to be tentative when genuinely unsure ("i'm wondering if…", "not sure we need…", "is it possible to…").
- Defer to design/Figma for visual values you can't verify ("where did you see this in figma?", "this should be design feedback").
- Flag follow-ups explicitly as out of scope ("let's address this in a separate PR", "todo: …").

---

## 1. API & prop design (highest priority)

- **Native HTML attribute names, not invented ones.** `disabled` not `isDisabled`; `error` not `isInvalid` (no `error` attr exists, but stay consistent with `disabled`/`readonly`). Follow the platform; don't surprise users.
- **Dash-case for prop string values**: `"basic-link"`, `"danger-outline"` — never camelCase values.
- **Don't initialize falsy defaults**: `({ hideCloseIcon, ... })` not `hideCloseIcon = false`.
- **Prefer opt-in booleans, inverted to the safe default**: `withCloseButton=false` rather than `hideCloseIcon`.
- **Pick specific props from primitives instead of hard-coding unions**: `ComponentPropsWithRef<typeof Button>["appearance"]` instead of re-typing `"danger" | "primary" | …`. Use `Pick<…, "open" | "modal">` rather than spreading a whole Root's props.
- **Don't re-declare props already supplied by the base** (`children` from `Flex`, etc.). Use `BoxProps<typeof X, {…}>` and let it flow.
- **Reuse upstream types**: e.g. `TableOptions<TData>` from tanstack rather than re-inventing `{columns, data}`. Don't re-export third-party types — consumers import them directly. Peer deps (react-table, etc.) are intentional.
- **Generics over `unknown` casts**: combobox/select item types should be a generic `Item`, threaded through props, context, and callbacks. Pass `selectedItem`/values through as-is without `String()`/`itemToString` coercion.
- **Controlled/uncontrolled**: expose `defaultX` / `x` / `onXChange`; derive controlled-ness from `typeof valueProp === "undefined"`, or use `useControllableState`. Don't half-implement it. Remember controlled state is "late by one render" — pass your own state through context rather than reading `downshift.selectedItem` directly.
- **Don't over-engineer.** Drop props that aren't needed yet ("skip this for now / later iteration"). Don't add a prop for something CSS/media-query can do automatically (e.g. equal-width tabs on mobile). Don't expose internal toggles consumers shouldn't touch (e.g. don't let consumers remove a built-in search icon via a prop — override internally with `addonBefore={null}`).
- **Naming = the primitive / the ecosystem.** `Progress` not `ProgressBar`; `RadioGroup`, `Menu`, `FileUpload`, `DropdownMenuSub` — match the underlying Radix primitive and what most libraries call it. Drop redundant prefixes (`Field` not `FormField`).
- **`Icon...` prefix for icons** so editor autocomplete surfaces them (`IconInfo`, not `InfoIcon`).
- **`intent` + `variant` are the styling axes** (`intent` for color — `neutral`/`primary`/`danger`/`information` etc.; `variant` for fill — `strong`/`subtle`/`outline`). Keep values consistent across components. `appearance` is a _preset_ shortcut mapping to an `{intent, variant}` combo — only for components with a limited fixed set of combos (Button), not free-form ones (Badge).

## 2. Composition, refs, prop forwarding

- **Spread `...props` onto the right element.** The outer `Box`/wrapper picks `className`; everything else forwards to the real inner control (`<input>`, `<textarea>`). Don't forward only `w`/single props — forward all.
- **`ref` and only truly element-specific props (`disabled`, `id`) go on the inner primitive**; everything else (`{...props}` incl. sprinkles) goes on the outer `Box`/`Text`. Never put `ref`/`{...props}` on a `Title`/inner node when there's an outer wrapper — put them on the outer. Spread `{...props}` straight onto the outer element via `BoxProps`/`TextProps`; don't reintroduce a manual sprinkle-extraction split.
- **Prop order controls override priority.** Put `data-*` and `{...styles.x()}` _before_ `{...props}` so consumers can override. (But controlled internal state must win where correctness requires.)
- **Don't wrap virtual elements in `Box`.** Radix `Portal`/`Root` render no DOM — no `asChild` Box around them; `Root` can't take a `ref` (forward it to the overlay/content instead).
- **Box-composition direction**: `<Flex asChild><RadixX.Overlay>` — Flex outside, primitive inside (`interface Overlay extends Flex`, the primitive has priority). Be consistent.
- **Collapse redundant elements.** Don't use both `Flex` and `Text`/`Box` when one element with the right props works. Don't wrap `children`/decorators in extra boxes. Use `<>` fragments when a parent already provides the wrapper element.
- **Use the existing component, not raw styles.** `<Heading level="3">` not `fontSize="3xl"`; `<Paper>` for surfaces (gets light/dark bg); `<Button>` for the dialog close (keyboard/focus); reuse `Field`/`FieldLabel`/`SearchInput`/`forceValueChange` rather than re-implementing.
- **`asChild` + `Slot` only when consumers will realistically swap the element.** A single fixed empty element (separator) doesn't need it.
- **Don't clone/iterate children to inject props** (`Children.map` + `cloneElement`) — children may be fragments/nested. Pass state via **context** and read it in the child instead.
- **Don't manufacture synthetic events as `any`.** Re-trigger React's native setter (`forceValueChange`) to clear/set an input value, and re-focus after; or use `useImperativeHandle` to expose native methods like `showPicker()`.

## 3. Styling system rules (vanilla-extract / sprinkles)

- **Tokens come through `theme` inside `.css.ts`** — never reference a token string directly in `style()` (`theme.colors["border.default"]`, not `"border.default"`). Bare sprinkle keys are fine in the sprinkle object, but `style({})` needs `theme.*`.
- **In `.tsx`, use native sprinkle props, not `sprinkles()` + `className`.** Rule of thumb: `sprinkles()` belongs in `.css.ts`; `.tsx` uses the props.
- **If styles are just sprinkles, inline them in the `.tsx`** — don't create a `.css.ts` file at all. Conversely, don't hand-roll a one-off `.css.ts` for what `h="12" w="auto"` does.
- **Don't mix `style()` and sprinkle props in the same recipe entry**; if it's a sprinkle prop, drop the `style()` wrapper. Don't reach for `style()` when sprinkles cover it.
- **No hard-coded numbers/sizes/colors — use the sprinkle scales.** Spacing (`gap`/`p*`/`m*`) takes **numeric pixel tokens** (`gap="8"`, `pt="16"`, `px="24"`) — t-shirt names like `gap="xs"` are no longer valid for spacing. Dimensions (`size`/`w`/`h`) and `borderRadius` still use t-shirt tokens (`size="md"`, `theme.borderRadius.lg` not `8px`). Use the `size` token instead of separate matching `w`/`h`; square things (icon buttons) use `size` to make the intent obvious. Use `surface` not `white` (light/dark).
- **Empty variant branches are `{}`, not `style({})`** — `style({})` creates a needless empty class. Move styles shared by all variants into `base` and _reset_ them in the special branch.
- **CSS vars get a `Var` suffix** (`columnWidthVar`). Marker classes for cross-component selectors: export a `className`/marker and reference it scoped — never write unscoped `[data-state="checked"]` selectors that an ancestor could accidentally match.
- **`z` from the sprinkle/token scale** (`z="popover"`, add `z="tooltip"` = 10000). Don't hard-code `zIndex`.
- **Don't fiddle with letter-spacing** except maybe headings. Don't set `font-weight: 400` (it's the default — no-op). Don't override default Button padding/shape/radius from a parent.
- **Animations**: prefer the `Transition` component over hand-written keyframes/`willChange`. Watch for flex `gap`/padding causing "jumps" in height-animated accordions/disclosures — apply padding to an _inner_ box, not the animated container.
- **Elements take container width** — don't give components a fixed `w`. Avatars are `inline-flex` (flow with text). Avoid `inline styles via style={{}}` unless there's a very specific reason.

## 4. Stories (storybook)

- **First/default story is named `Basic`** (not `Default`). No `With…` prefixes — mirror the existing Input/Button story names.
- **Use `args`, not `render`,** wherever possible so controls integrate. When `render` is needed, forward `(args)` and spread them; build variant stories with `...Basic, args: {…}`.
- **One concern per story.** Don't pile `info` + `label` + `error` into Basic — split them. Don't sprinkle a secondary feature (e.g. `addonBefore`/`addonAfter`) across every story; give it one dedicated story. Name stories for intent (`IconOnly`, `IconWithText`, `ComplexContent`, `LongContent`).
- **Don't hand-specify `argTypes`/`component`/`title`/`layout: centered`** that Storybook auto-detects. Do specify the `action`/`onX` arg wiring when needed, and the `design`/figma URL.
- **Story args should be deliberate** — don't pass default-valued args, don't forward parent `args` down to every child in a group story (set them only on the parent).
- **Add `play` functions that assert real behavior** (open/close, scrollbar via `offsetWidth < scrollWidth`), not just render.
- Components still in development export from **`unstable`** only — stories import from `@optiaxiom/react/unstable`, and `index.ts` doesn't export them yet.

## 5. Accessibility

- Use a real **`<button>`** for any interactive trigger (keyboard, focus, SR) — don't style a `div`. This is a recurring hard rule.
- **`fill="currentColor"`** on icon SVGs so color is CSS-controllable; `aria-hidden` decorative icons (or rather, just drop `role="img"`); icon-only buttons need `aria-label` (Capitalized).
- Prefer accessible **roles/labels** over `data-testid`; reserve `data-testid` for the edge cases. Meaningful `aria-label`s ("Main navigation", not "side").
- `htmlFor`/`id` wiring on labels; generate `id` with `useId` when not provided — never _require_ an `id` prop. Dynamic ids for repeated fields (don't hard-code `id="iconInfo"`).
- Info/help icons must **not** live inside `<label>` (they'd join the accessible name and steal focus to the input) — wrap label + icon in a separate element.
- `aria-current="page"` on the current breadcrumb. Don't ship empty table headers — add visually-hidden labels.
- `data-*` attributes are for exposing state to consumers / consuming downstream libs; for state you control yourself, use a **variant**, not a `data-` attr. Keep both `aria-*` and `data-*` but **style only off `data-*`** (aria is the intent, data is the styling contract).

## 6. Housekeeping (still always flagged)

- **No `eslint-disable`** unless truly unavoidable (e.g. add the real `key`, don't disable the rule). Run prettier. Remove commented-out code and stray comments.
- **Naming conventions**: components/types `PascalCase`; everything else (styles, vars, files) `camelCase`, ideally a single word (`item`, `option`, `indicator`, `wrapper`/component-name for the root). Directories `kebab-case`. Story files have no spaces.
- **Blank lines group related blocks** like paragraphs — keep them; add them between import block and code, between JSX siblings for readability.
- **Drop out-of-scope commits/changes** ("this exists in main now", "drop this commit", "split this PR by component", "squash into one commit"). A PR should do one thing.
- **Keep the diff minimal** — revert unrelated formatting/import-order churn; rebase against `main` when asked.
- **Changesets**: required for user-facing changes (often both `react` and `web-components`). Use normal semver — `patch` for fixes, `minor` for backwards-compatible features, `major` for breaking changes. Reword changeset prose to be consumer-facing and accurate ("added X to Y via `prop`"). Follow-ups to an unreleased feature may not need their own changeset.
- **Dependencies** go in the owning workspace's `package.json`, not the root. Watch for accidental deps (`framer-motion`, build plugins) — "don't need this". pnpm quirk: a transitive sub-package occasionally has to be added as an explicit direct dep for a peer/import to resolve.
- New components must be wired everywhere: `index.ts`/`unstable.ts` export **and** `packages/web-components/package.json`.
- Pin/hold-back dep bumps that break the toolchain, and **leave a comment explaining why** (e.g. TS held at 5.5 for eslint-plugin compat). Same for non-obvious CSS (16px input font to stop iOS zoom; line-height tweaks for borders) — keep them and add an explanatory comment.

---

## Reasoning patterns to apply (not just rules)

When you find an issue, reach for the underlying principles:

- **"Who owns this?"** Consumers own content/styling of decorators and children; the lib owns structure and behavior. Don't dictate capitalization, don't style injected content, don't lock consumers into `lineClamp`.
- **"Is this the primitive's job?"** Reuse Radix/downshift/tanstack state and behavior; don't reimplement focus traps, selection, pagination state.
- **"Will this break `asChild`/Slot or composition?"** Single-child constraints, virtual elements, prop priority.
- **"Does this scale to N / dark mode / mobile / multi-line / RTL?"** `start`/`end` not `left`/`right`; responsive sprinkle arrays; `surface` token; `flex="none"` + `align-items: start` for multi-line.
- **"Is this in scope?"** Push unrelated fixes, speculative props, and design-value debates out — into a separate PR, a `todo`, or back to the designer/Figma.
- **"Minimal, consistent, native."** The smallest diff, matching existing conventions, using the platform's own names and attributes.
