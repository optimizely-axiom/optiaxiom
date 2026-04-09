import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const banner = recipe({
  base: [
    {
      alignItems: "start",
      color: "fg.default",
      fontSize: "md",
      fontWeight: "500",
      gap: "12",
      justifyContent: "space-between",
      px: "24",
      py: "12",
    },
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different banner types.
     */
    intent: {
      danger: {
        bg: "bg.error.subtle",
      },
      information: {
        bg: "bg.information.subtle",
      },
      neutral: {
        bg: "bg.tertiary",
      },
      success: {
        bg: "bg.success.subtle",
      },
      warning: {
        bg: "bg.warning.subtle",
      },
    },
  },
});

export const icon = recipe({
  base: [
    {
      mt: "4",
    },
  ],
  variants: {
    intent: {
      danger: {
        color: "fg.error.strong",
      },
      information: {
        color: "fg.information.strong",
      },
      neutral: {
        color: "fg.tertiary",
      },
      success: {
        color: "fg.success.strong",
      },
      warning: {
        color: "fg.warning.strong",
      },
    },
  },
});

export const content = recipe({
  base: [
    {
      flex: "1",
      flexDirection: "column",
      gap: "8",
      justifyContent: "center",
    },
    style({
      minHeight: theme.size.sm,
    }),
  ],
});

export type BannerVariants = RecipeVariants<typeof banner>;
