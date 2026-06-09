import { theme } from "@optiaxiom/react/css-runtime";

import { globalStyle, recipe, style } from "../vanilla-extract";

const marker = style({});

// Marker class for the rendered Separator; its margins are set in the ordered
// vertical-rhythm rules below (a plain style() here would lose to the higher-
// specificity base rule in the same layer).
export const separator = style({});

export const markdown = recipe({
  base: [
    {
      color: "fg.default",
      fontSize: "md",
    },
    marker,
  ],
});

// Vertical rhythm. These rules share one layer and one specificity, so ORDER IS
// SIGNIFICANT — each block intentionally overrides the ones above it: defaults
// first, boundary resets last.

const scope = `:is(${marker}, ${marker} li)`;
const headings = ":is(h1, h2, h3, h4, h5, h6)";

// 1. Default: every block separated by bottom margin.
globalStyle(`${marker} > *`, {
  marginBottom: "1em",
  marginTop: 0,
});
globalStyle(`${marker} li > *`, {
  marginBottom: "1em",
  marginTop: "1em",
});
globalStyle(`${marker} li:first-child > *`, {
  marginTop: "0",
});

// 2. Headings: more space above, less below (bind to the content they introduce).
globalStyle(`${scope} > ${headings}`, {
  marginBottom: "0.6em",
  marginTop: "1.2em",
});

// 3. Separator owns equal space on both sides.
globalStyle(`${marker} > ${separator}`, {
  marginBottom: "1em",
  marginTop: "1em",
});

// 4. Boundary resets — override the spacing above where blocks meet edges,
//    headings, or separators.
globalStyle(`${scope} > ${headings} + *`, {
  marginTop: 0,
});
globalStyle(`${marker} > :has(+ ${separator}), ${scope} > :last-child`, {
  marginBottom: 0,
});
globalStyle(`${marker} > ${separator} + *, ${marker} > :first-child`, {
  marginTop: 0,
});

// Tables get extra breathing room so surrounding text doesn't crowd the border.
export const table = recipe({
  base: [
    style({
      marginBottom: "2em",
      marginTop: "2em",
    }),
  ],
});

export const orderedList = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      gap: "6",
    },
    style({
      listStyleType: "decimal",
      paddingInlineStart: "1.5em",
    }),
  ],
});

export const unorderedList = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
      gap: "6",
    },
    style({
      listStyleType: "disc",
      paddingInlineStart: "1.5em",
    }),
  ],
});

const codeBlockMarker = style({});

export const code = recipe({
  base: [
    {
      bg: "bg.secondary",
      overflow: "auto",
      p: "12",
      rounded: "md",
    },
    codeBlockMarker,
  ],
});

// Strip the inline-code lozenge inside fenced blocks (pre provides the surface).
// Note: this reset only works because inlineCode sets these via style() — moving
// them to sprinkle props would put them in a higher layer and break this.
globalStyle(`${codeBlockMarker} code`, {
  backgroundColor: "transparent",
  borderRadius: 0,
  padding: 0,
});

export const inlineCode = recipe({
  base: [
    {
      fontFamily: "mono",
    },
    style({
      backgroundColor: theme.colors["bg.secondary"],
      borderRadius: theme.borderRadius.md,
      fontSize: "85%",
      fontVariantLigatures: "none",
      padding: "0.2em 0.4em",
      whiteSpace: "break-spaces",
    }),
  ],
});

export const inlineImage = recipe({
  base: [
    {
      rounded: "sm",
    },
    style({
      display: "inline-block",
      maxWidth: "100%",
      verticalAlign: "text-bottom",
    }),
  ],
});
