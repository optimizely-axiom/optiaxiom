import { theme } from "../styles";
import { style } from "../vanilla-extract";

export const description = style({
  color: theme.colors["fg.default"],
  fontSize: "12px",
  lineHeight: "20px",
  marginTop: "2px",
});

export const label = style({
  color: theme.colors["fg.secondary"],
});

export const formField = style({
  display: "flex",
  flexDirection: "column",
  maxWidth: theme.maxSize.sm,
});

export const labelRequired = style({
  color: theme.colors["border.error"],
});

export const error = style({
  color: theme.colors["border.error"],
  fontSize: "12px",
  lineHeight: "20px",
  marginTop: "2px",
});
