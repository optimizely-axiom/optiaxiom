import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

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
    },
    style({
      maxHeight: "50dvh",
      maxWidth: "calc(100dvw - 2 * 24px)",
      transform: `
        translateY(calc(1rem * ${nestedDialogCountVar}))
        scale(calc(1 - 0.06 * ${nestedDialogCountVar}))
      `,
    }),
  ],
  variants: {
    /**
     * Control the size/width of the dialog box.
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
