import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

export const backdrop = recipe({
  variants: {
    hidden: {
      false: {},
      true: style({
        opacity: "0",
      }),
    },
  },
});

export const root = recipe({
  base: [
    {
      alignItems: "center",
      gap: "0",
      z: "popover",
    },
    style({
      inset: "0",
      position: "fixed",
    }),
  ],
});

export const nestedDialogCountVar = createVar();

export const content = recipe({
  base: [
    {
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
    },
    style({
      maxHeight: "50dvh",
      maxWidth: "calc(100dvw - 2 * 24px)",
      transform: `
        translateY(calc(1rem * ${nestedDialogCountVar}))
        scale(calc(1 - 0.06 * ${nestedDialogCountVar}))
      `,

      selectors: {
        "&:focus-visible": {
          outline: "none",
        },
      },
    }),
  ],
  variants: {
    /**
     * Control the size/width of the alert dialog box.
     *
     * Size guidelines:
     * - sm (400px, default): Simple confirmations, brief messages, 1-2 actions
     * - md (600px): Moderate content, longer messages, 2-3 actions
     * - lg (800px): Detailed alerts with longer descriptions or more context
     *
     * 💡 Tip: When matching designs from screenshots, compare the content
     * density and action count against these guidelines. Most alerts work well
     * at 'sm' (default) and only need to increase if the design clearly shows
     * more content.
     */
    size: {
      sm: style({
        width: "400px",
      }),
      md: style({
        width: "600px",
      }),
      lg: style({
        width: "800px",
      }),
    },
  },
});

export type DialogVariants = RecipeVariants<typeof content>;
