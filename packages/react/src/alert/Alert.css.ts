import { theme } from "@optiaxiom/globals";

import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const alert = recipe({
  base: [
    {
      alignItems: "start",
      color: "fg.default",
      flexDirection: "row",
      fontSize: "md",
      fontWeight: "500",
      gap: "8",
      justifyContent: "space-between",
      p: "12",
      pr: "16",
      rounded: "md",
    },
  ],
  variants: {
    /**
     * Control the appearance by selecting between the different alert types.
     */
    intent: {
      danger: {
        bg: "bg.error.subtle",
      },
      information: {
        bg: "bg.information.subtle",
      },
      neutral: {
        bg: "bg.secondary",
      },
      opal: style({
        backgroundImage: `
          linear-gradient(
            135deg,
            light-dark(#F5F3FF, #1e1b3a),
            light-dark(#E5EFFF, #1a2b45)
          )
        `,
      }),
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
      opal: {
        h: "xs",
        mt: "2",
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
      gap: "8",
      justifyContent: "center",
    },
    style({
      minHeight: theme.size.sm,
    }),
  ],
});

export type AlertVariants = RecipeVariants<typeof alert>;
