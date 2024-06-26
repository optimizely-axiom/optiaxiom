import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const button = recipe({
  base: style({
    selectors: {
      "&:not(:first-child):not(:last-child)": {
        borderRadius: 0,
      },
    },
  }),
  variants: {
    orientation: {
      horizontal: style({
        selectors: {
          "&:first-child": {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
          "&:last-child": {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          },
        },
      }),
      vertical: style({
        selectors: {
          "&:first-child": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          "&:last-child": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        },
      }),
    },
    spacing: {
      false: {},
      true: {},
    },
  },
  variantsCompounded: [
    {
      style: style({
        selectors: {
          "&:not(:first-child)": {
            borderLeft: "none",
          },
        },
      }),
      variants: {
        orientation: "horizontal",
        spacing: false,
      },
    },
    {
      style: style({
        selectors: {
          "&:not(:first-child)": {
            borderTop: "none",
          },
        },
      }),
      variants: {
        orientation: "vertical",
        spacing: false,
      },
    },
  ],
});

export type ButtonGroupVariants = RecipeVariants<typeof button>;
