import { theme } from "../styles";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      border: "1",
      fontSize: "md",
      overflow: "auto",
      rounded: "sm",
    },
    style({
      border: "1",
      borderColor: theme.colors["border.default"],
      gap: theme.spacing["xs"],
      letterSpacing: "-.14px",
      padding: theme.spacing["xs"],
      selectors: {
        "&:aria-invalid": {
          borderColor: "border.error",
        },
        "&:focus-within": {
          outline: "2",
          outlineColor: theme.colors["brand.200"],
          outlineOffset: "1",
        },
        '&:focus-within:is([data-invalid="true"])': {
          outlineColor: theme.colors["red.200"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        '&:focus-within:not([data-invalid="true"])': {
          outlineColor: theme.colors["brand.200"],
          outlineOffset: "1px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
        "&:hover": {
          borderColor: theme.colors["border.brand"],
        },
        '&[data-disabled="true"]': {
          backgroundColor: theme.colors["bg.disabled"],
          borderColor: theme.colors["border.secondary"],
          pointerEvents: "none",
        },
        '&[data-invalid="true"]': {
          borderColor: theme.colors["border.error"],
        },
      },
      width: "340px",
    }),
  ],
});
export const textarea = recipe({
  base: [
    {
      w: "full",
    },
    style({
      alignItems: "flex-start",
      borderColor: theme.colors["border.default"],
      color: theme.colors["fg.default"],
      flexGrow: "1",
      lineHeight: "24px",
      minHeight: "108px",
      resize: "none",
      selectors: {
        "&:focus-visible": {
          outlineWidth: "0px",
        },
        '[data-disabled="true"] &': {
          backgroundColor: theme.colors["neutral.50"],
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
});
