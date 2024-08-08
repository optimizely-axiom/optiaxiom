import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

const marker = style({});

export const trigger = recipe({
  base: [
    marker,
    style({
      color: theme.colors["fg.tertiary"],
      userSelect: "none",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
  variants: {
    appearance: {
      primary: style({
        borderColor: `transparent`,
        padding: "4px 0px",

        selectors: {
          '&:hover:not([data-state="active"])': {
            borderColor: theme.colors["border.default"],
            color: theme.colors["fg.secondary"],
          },
          '&[data-orientation="horizontal"]': {
            borderBottomWidth: "2px",
            marginBottom: "-1px",
          },
          '&[data-orientation="vertical"]': {
            borderRightWidth: "2px",
            marginRight: "-1px",
            paddingInline: "10px",
          },
          '&[data-state="active"]': {
            borderColor: theme.colors["border.brand"],
            color: theme.colors["fg.default"],
          },
        },
      }),
      secondary: style({
        borderRadius: theme.borderRadius.md,
        padding: "10px 12px",

        selectors: {
          '&:hover:not([data-state="active"])': {
            backgroundColor: theme.colors["white"],
            color: theme.colors["fg.secondary"],
          },
          '&[data-orientation="vertical"]': {
            paddingInline: "10px",
          },
          '&[data-state="active"]': {
            backgroundColor: theme.colors["bg.neutral"],
            color: theme.colors["bg.neutral.inverse"],
          },
        },
      }),
    },
  },
});

export const content = recipe({
  base: [
    {
      flexDirection: "row",
      rounded: "sm",
    },
    style({
      selectors: {
        [`${marker}:active &`]: {
          backgroundColor: theme.colors["bg.input.disabled"],
        },
      },
    }),
  ],
  variants: {
    appearance: {
      primary: {
        borderColor: `transparent`,
        gap: "xs",
        py: "6",
      },
      secondary: {
        gap: "4",
      },
    },
  },
});
