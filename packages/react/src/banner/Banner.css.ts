import { recipe, type RecipeVariants } from "../vanilla-extract";

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
        bg: "bg.error.light",
      },
      information: {
        bg: "bg.information.light",
      },
      neutral: {
        bg: "bg.tertiary",
      },
      success: {
        bg: "bg.success.light",
      },
      warning: {
        bg: "bg.warning.light",
      },
    },
  },
});

export const icon = recipe({
  base: [
    {
      color: "bg.default.inverse",
      h: "16",
      mt: "4",
      w: "auto",
    },
  ],
});

export type BannerVariants = NonNullable<RecipeVariants<typeof banner>>;
