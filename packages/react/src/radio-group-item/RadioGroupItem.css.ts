import { theme } from "../styles";
import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "0",
    },
  ],
});

export const item = recipe({
  base: [
    {
      bg: "white",
      border: "1",
      p: "2",
      rounded: "full",
      size: "16",
    },
    style({
      borderColor: theme.colors["fg.tertiary"],

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&[data-disabled]": {
          borderColor: theme.colors["border.secondary"],
        },
        "&[data-state='checked']:not([data-disabled])": {
          borderColor: theme.colors["border.brand"],
        },
      },
    }),
  ],
});

export const indicator = recipe({
  base: [
    {
      display: "block",
      rounded: "full",
      size: "full",
    },
    style({
      backgroundColor: theme.colors["fg.brand"],

      selectors: {
        "&[data-disabled]": {
          backgroundColor: theme.colors["border.secondary"],
        },
      },
    }),
  ],
});

export const label = recipe({
  base: [
    {
      flex: "1",
    },
    style({
      cursor: "pointer",
    }),
  ],
  variants: {
    disabled: {
      false: style({
        color: theme.colors["fg.default"],
        cursor: "pointer",
      }),
      true: style({
        color: theme.colors["fg.disabled"],
        cursor: "not-allowed",
      }),
    },
    readonly: {
      false: {},
      true: style({
        cursor: "default",
      }),
    },
  },
});

export const endDecorator = recipe({
  base: [
    {
      flex: "1",
      ml: "24",
    },
  ],
  variants: {
    disabled: {
      false: style({
        color: theme.colors["fg.default"],
        cursor: "pointer",
      }),
      true: style({
        color: theme.colors["fg.disabled"],
        cursor: "not-allowed",
      }),
    },
  },
});
