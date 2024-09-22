import { type RecipeVariants, recipe } from "../vanilla-extract";

export const banner = recipe({
  base: [
    {
      alignItems: "start",
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      justifyContent: "space-between",
      p: "md",
    },
  ],
  variants: {
    colorScheme: {
      danger: {
        bg: "red.200",
      },
      information: {
        bg: "brand.200",
      },
      neutral: {
        bg: "bg.neutral.solid",
      },
      success: {
        bg: "green.200",
      },
      warning: {
        bg: "yellow.200",
      },
    },
  },
});

export const icon = recipe({
  base: [
    {
      color: "bg.neutral.inverse",
      h: "16",
      mt: "4",
      w: "auto",
    },
  ],
});

export type BannerVariants = NonNullable<RecipeVariants<typeof banner>>;
