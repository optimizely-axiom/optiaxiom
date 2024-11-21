import { theme } from "@optiaxiom/globals";

import { globalStyle, recipe, style } from "../vanilla-extract";

const marker = style({});

export const input = recipe({
  base: marker,
});

globalStyle(`${marker} .tiptap:focus-visible`, {
  outline: "2px solid transparent",
});

globalStyle(`${marker} p:first-child`, {
  marginTop: "0",
});

globalStyle(`${marker} p:last-child`, {
  marginBottom: "0",
});

globalStyle(`${marker} p.is-editor-empty:only-child::before`, {
  color: theme.colors["border.active"],
  content: "attr(data-placeholder)",
  float: "left",
  height: "0",
  pointerEvents: "none",
});
