import { type RecipeVariants, recipe } from "../vanilla-extract";

export const button = recipe({
  base: {
    selectors: {
      "&:not(:first-child):not(:last-child)": {
        borderRadius: 0,
      },
    },
  },
  compoundVariants: [
    {
      style: {
        selectors: {
          ["&:not(:first-child)"]: {
            borderLeft: "none",
          },
        },
      },
      variants: {
        orientation: "horizontal",
        spacing: false,
      },
    },
    {
      style: {
        selectors: {
          ["&:not(:first-child)"]: {
            borderTop: "none",
          },
        },
      },
      variants: {
        orientation: "vertical",
        spacing: false,
      },
    },
  ],
  variants: {
    orientation: {
      horizontal: {
        selectors: {
          [`&:first-child`]: {
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
          [`&:last-child`]: {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          },
        },
      },
      vertical: {
        selectors: {
          [`&:first-child`]: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          [`&:last-child`]: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        },
      },
    },
    spacing: {
      false: {},
      true: {},
    },
  },
});

export const buttonGroup = recipe({
  base: {},
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
  },
});
export type ButtonGroupVariants = RecipeVariants<typeof button>;
