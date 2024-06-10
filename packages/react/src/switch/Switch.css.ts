import { theme } from "../styles";
import { style } from "../vanilla-extract";

export const switchBox = style({
  display: "flex",
  flexDirection: "row",
});

export const switchStyle = style({
  all: "unset",
  backgroundColor: theme.colors["fg.brand"],
  borderRadius: "24px",
  height: "20px",
  position: "relative",
  width: "40px",

  selectors: {
    "&:focus-visible": {
      outline: "1px",
      outlineColor: theme.colors["fg.brand.hover"],
      outlineOffset: "2px",
      outlineStyle: "solid",
      outlineWidth: "2px",
    },
    "&:hover": {
      backgroundColor: theme.colors["fg.brand.hover"],
    },
    "&:hover&[data-disabled]": {
      backgroundColor: theme.colors["fg.tertiary"],
    },
    "&[data-disabled]": {
      backgroundColor: theme.colors["fg.disabled"],
      cursor: "not-allowed",
    },
  },
});

export const beforeSwitch = style({
  marginRight: "4px",

  selectors: {
    '&[data-checked="false"]': { color: theme.colors["dark.600"] },
    '&[data-checked="true"]': { color: "#83839B" },
  },
});

export const afterSwitch = style({
  marginLeft: "4px",

  selectors: {
    '&[data-checked="false"]': { color: "#83839B" },
    '&[data-checked="true"]': { color: theme.colors["dark.600"] },
  },
});

export const switchThumb = style({
  backgroundColor: "white",
  borderRadius: "24px",
  display: "block",
  height: "16px",
  transform: "translateX(2px)",
  transition: "transform 100ms",
  width: "16px",
  willChange: "transform",

  selectors: {
    '&[data-state="checked"]': { transform: "translateX(22px)" },
  },
});
