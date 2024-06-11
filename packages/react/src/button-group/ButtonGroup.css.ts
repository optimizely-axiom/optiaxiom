import { type RecipeVariants, createVar, recipe } from "../vanilla-extract";
const roundedBorderRadius = createVar();
export const buttonGroup = recipe({
  base: {
    borderRadius: "0",
    vars: {
      [roundedBorderRadius]: "5px",
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
            borderBottomLeftRadius: roundedBorderRadius,
            borderTopLeftRadius: roundedBorderRadius,
          },
          [`&:last-child`]: {
            borderBottomRightRadius: roundedBorderRadius,
            borderTopRightRadius: roundedBorderRadius,
          },
        },
      },
      vertical: {
        selectors: {
          [`&:first-child`]: {
            borderTopLeftRadius: roundedBorderRadius,
            borderTopRightRadius: roundedBorderRadius,
          },
          [`&:last-child`]: {
            borderBottomLeftRadius: roundedBorderRadius,
            borderBottomRightRadius: roundedBorderRadius,
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

export const parentButtonGroup = recipe({
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
export type ButtonGroupVariants = RecipeVariants<typeof buttonGroup>;
