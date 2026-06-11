import { theme } from "@optiaxiom/globals";

import { globalStyle, recipe, style } from "../vanilla-extract";

const editorClass = style({});

export const editor = recipe({
  base: [
    {
      bg: "bg.default",
      border: "1",
      display: "flex",
      flexDirection: "column",
      rounded: "md",
    },
    style({
      borderColor: theme.colors["border.tertiary"],
      overflow: "hidden",
      selectors: {
        "&:focus-within": {
          borderColor: theme.colors["border.focus"],
          boxShadow: `0 0 0 1px ${theme.colors["border.focus"]}`,
        },
      },
    }),
    editorClass,
  ],
});

export const toolbar = recipe({
  base: [
    {
      alignItems: "center",
      borderB: "1",
      borderColor: "border.tertiary",
      gap: "2",
      px: "8",
      py: "6",
    },
    style({
      flexWrap: "wrap",
    }),
  ],
});

globalStyle(`${editorClass} > div:has(> .ProseMirror)`, {
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
});

globalStyle(`${editorClass} .ProseMirror`, {
  color: theme.colors["fg.default"],
  fontSize: theme.fontSize.md.fontSize,
  lineHeight: theme.fontSize.md.lineHeight,
  minHeight: "120px",
  outline: "none",
  padding: "12px 14px",
});

// Vertical rhythm. These rules share one layer and one specificity, so ORDER IS
// SIGNIFICANT — each block intentionally overrides the ones above it (mirrors
// ProteusMarkdown.css.ts): defaults first, boundary resets last. The scope
// includes <li> and table cells because TipTap wraps their content in a <p>.
const scope = `:is(.ProseMirror, .ProseMirror li, .ProseMirror :is(th, td))`;
const headings = ":is(h1, h2, h3)";

// 1. Default: every block separated by bottom margin, no horizontal margin
//    (drops e.g. the browser's default blockquote inline margin).
globalStyle(`${editorClass} ${scope} > *`, {
  marginBottom: "0.75em",
  marginInline: 0,
  marginTop: 0,
});

// 2. Headings: more space above, less below (bind to the content they introduce).
globalStyle(`${editorClass} ${scope} > ${headings}`, {
  marginBottom: "0.4em",
  marginTop: "1.2em",
});

// 3. Boundary resets — collapse spacing where blocks meet edges or headings.
globalStyle(`${editorClass} ${scope} > ${headings} + *`, {
  marginTop: 0,
});
globalStyle(`${editorClass} ${scope} > :last-child`, {
  marginBottom: 0,
});
globalStyle(`${editorClass} ${scope} > :first-child`, {
  marginTop: 0,
});

// Headings mirror ProteusMarkdown's Heading sizes/weight (level 1-3 → 2xl/xl/lg
// at fontWeight 600, fg.default color) rather than the browser's heavy default
// bold in pure black.
globalStyle(`${editorClass} .ProseMirror ${headings}`, {
  color: theme.colors["fg.default"],
  fontWeight: 600,
});
globalStyle(`${editorClass} .ProseMirror h1`, {
  fontSize: theme.fontSize["2xl"].fontSize,
  lineHeight: theme.fontSize["2xl"].lineHeight,
});
globalStyle(`${editorClass} .ProseMirror h2`, {
  fontSize: theme.fontSize.xl.fontSize,
  lineHeight: theme.fontSize.xl.lineHeight,
});
globalStyle(`${editorClass} .ProseMirror h3`, {
  fontSize: theme.fontSize.lg.fontSize,
  lineHeight: theme.fontSize.lg.lineHeight,
});

// Match ProteusMarkdown's <strong> weight (600) instead of browser-default bold.
globalStyle(`${editorClass} .ProseMirror :is(b, strong)`, {
  fontWeight: 600,
});

globalStyle(`${editorClass} .ProseMirror :is(ul, ol)`, {
  paddingLeft: "1.5em",
});

globalStyle(`${editorClass} .ProseMirror blockquote`, {
  borderLeft: `3px solid ${theme.colors["border.tertiary"]}`,
  color: theme.colors["fg.secondary"],
  paddingLeft: "0.75em",
});

// Tables mimic the Table component's look: a rounded bordered box with
// horizontal row dividers only (no vertical grid lines), padded cells, and a
// muted header row. Use `separate` (not `collapse`) borders so border-radius +
// overflow:hidden actually clip the corners — collapsed borders ignore radius.
globalStyle(`${editorClass} .ProseMirror table`, {
  border: `1px solid ${theme.colors["border.tertiary"]}`,
  borderCollapse: "separate",
  borderRadius: theme.borderRadius.lg,
  borderSpacing: 0,
  overflow: "hidden",
  width: "100%",
});
// Cells: padded, top-aligned, with a bottom border acting as the row divider.
globalStyle(`${editorClass} .ProseMirror :is(th, td)`, {
  borderBottom: `1px solid ${theme.colors["border.tertiary"]}`,
  padding: "16px",
  textAlign: "start",
  verticalAlign: "top",
});
// The final body row drops its divider so it doesn't double up with the table's
// own bottom border.
globalStyle(`${editorClass} .ProseMirror tbody tr:last-child :is(th, td)`, {
  borderBottom: "none",
});
globalStyle(`${editorClass} .ProseMirror th`, {
  color: theme.colors["fg.tertiary"],
  fontSize: theme.fontSize.sm.fontSize,
  fontWeight: 400,
});

// Shared mono surface for code blocks and inline code. font-size lives on the
// outer elements only (pre, and inline code) so it never compounds — a <code>
// nested in <pre> inherits the pre's size instead of multiplying 0.9em twice.
globalStyle(`${editorClass} .ProseMirror :is(code, pre)`, {
  background: theme.colors["bg.page"],
  borderRadius: "4px",
  fontFamily: theme.fontFamily.mono,
});

// Inline code: small lozenge. Excludes <code> inside a fenced block (pre code),
// which is just text on the pre's surface.
globalStyle(`${editorClass} .ProseMirror :not(pre) > code`, {
  fontSize: "0.9em",
  padding: "0.1em 0.3em",
});

// Fenced code block: the <pre> owns the surface and the single font-size; the
// inner <code> resets its lozenge styling.
globalStyle(`${editorClass} .ProseMirror pre`, {
  fontSize: "0.9em",
  overflow: "auto",
  padding: "0.75em 1em",
});
globalStyle(`${editorClass} .ProseMirror pre code`, {
  background: "transparent",
  borderRadius: 0,
  fontSize: "inherit",
  padding: 0,
});

globalStyle(`${editorClass} .ProseMirror a`, {
  color: theme.colors["fg.link.default"],
  textDecoration: "underline",
});

globalStyle(
  `${editorClass} .ProseMirror p.is-editor-empty:first-child::before`,
  {
    color: theme.colors["fg.tertiary"],
    content: "attr(data-placeholder)",
    float: "left",
    height: 0,
    pointerEvents: "none",
  },
);
