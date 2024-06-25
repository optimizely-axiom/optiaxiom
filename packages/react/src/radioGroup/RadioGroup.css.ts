import { theme } from "../styles";
import { style } from "../vanilla-extract";

export const option = style({
  alignItems: "flex-start",
  flexDirection: "row",
  gap: "8px",
});

export const item = style({
  backgroundColor: "white",
  border: "1px",
  borderColor: theme.colors["fg.tertiary"],
  borderRadius: "100%",
  borderStyle: "solid",
  height: 16,
  marginBottom: "3px",
  marginTop: "3px",
  padding: 0,
  width: 16,

  selectors: {
    "&:focus-visible": {
      outline: "2px",
      outlineColor: theme.colors["brand.300"],
      outlineOffset: "1px",
      outlineStyle: "solid",
    },
    "&[data-disabled]": {
      borderColor: theme.colors["border.secondary"],
    },
    "&[data-state='checked']&:not([data-disabled])": {
      borderColor: theme.colors["border.brand"],
    },
  },
});

export const indicator = style({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  position: "relative",
  width: "100%",

  selectors: {
    "&::after": {
      backgroundColor: theme.colors["fg.brand"],
      borderRadius: "50%",
      content: "",
      display: "block",
      height: 11,
      width: 11,
    },
    "&[data-disabled]::after": {
      backgroundColor: theme.colors["border.secondary"],
      borderRadius: "50%",
      content: "",
      display: "block",
      height: 11,
      width: 11,
    },
  },
});

export const label = style({
  lineHeight: "24px",
});
