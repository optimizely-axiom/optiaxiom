// import { theme } from "../styles";
import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const iconC = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        '[data-state="checked"] &': {
          display: "block",
        },
      },
    }),
  ],
});

export const iconUC = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        '[data-state="unchecked"] &': {
          display: "block",
        },
      },
    }),
  ],
});

export const iconI = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        '[data-state="indeterminate"] &': {
          display: "block",
        },
      },
    }),
  ],
});

export const indicator = recipe({
  base: [
    style({
      alignItems: "center",
      background: theme.colors["bg.brand.solid"],
      borderRadius: theme.borderRadius["xs"],
      color: "black",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      selectors: {
        "&:hover": {
          background: theme.colors["bg.brand.solid.hover"],
        },
        '[data-disabled="true"] &': {
          background: theme.colors["neutral.150"],
        },
      },
    }),
  ],
});

export const checkboxRoot = recipe({
  base: [
    style({
      border: `1px solid ${theme.colors["neutral.500"]}`,
      borderRadius: theme.borderRadius["xs"],
      color: theme.colors.black,
      height: theme.spacing["16"],
      justifyContent: "center",
      selectors: {
        "&:focus-visible": {
          outlineColor: theme.colors["brand.300"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        "&:hover": {
          border: `1px solid ${theme.colors["fg.tertiary"]}`,
        },
        '&[data-disabled="true"]': {
          background: theme.colors["bg.disabled"],
          cursor: "not-allowed",
        },
        '&[data-state="checked"] ': {
          border: "none",
        },
        '&[data-state="indeterminate"]': {
          border: "none",
        },
      },
      width: theme.spacing["16"],
    }),
  ],
});
