import { theme } from "@optiaxiom/globals";

import { globalStyle, recipe, style } from "../vanilla-extract";

const editorClass = style({});

export const editor = recipe({
  base: [
    {
      bg: "bg.default",
      border: "1",
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

globalStyle(`${editorClass} .ProseMirror`, {
  minHeight: "120px",
  outline: "none",
  padding: "12px 14px",
});

globalStyle(`${editorClass} .ProseMirror > * + *`, {
  marginTop: "0.75em",
});

globalStyle(`${editorClass} .ProseMirror p`, {
  margin: 0,
});

globalStyle(`${editorClass} .ProseMirror :is(h1, h2, h3)`, {
  fontWeight: 600,
  lineHeight: 1.25,
  margin: 0,
});
globalStyle(`${editorClass} .ProseMirror h1`, { fontSize: "1.5em" });
globalStyle(`${editorClass} .ProseMirror h2`, { fontSize: "1.25em" });
globalStyle(`${editorClass} .ProseMirror h3`, { fontSize: "1.1em" });

globalStyle(`${editorClass} .ProseMirror :is(ul, ol)`, {
  margin: 0,
  paddingLeft: "1.25em",
});

globalStyle(`${editorClass} .ProseMirror blockquote`, {
  borderLeft: `3px solid ${theme.colors["border.tertiary"]}`,
  color: theme.colors["fg.secondary"],
  margin: 0,
  paddingLeft: "0.75em",
});

globalStyle(`${editorClass} .ProseMirror :is(code, pre)`, {
  background: theme.colors["bg.page"],
  borderRadius: "4px",
  fontFamily: theme.fontFamily.mono,
  fontSize: "0.9em",
  padding: "0.1em 0.3em",
});

globalStyle(`${editorClass} .ProseMirror pre`, {
  overflow: "auto",
  padding: "0.75em 1em",
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
