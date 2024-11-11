import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const container = recipe({
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

export const content = recipe({
  base: [
    {
      bg: "bg.default",
      display: "flex",
      flexDirection: "column",
      rounded: "lg",
      shadow: "md",
    },
    style({
      maxHeight: "50dvh",
      maxWidth: "calc(100dvw - 2 * 24px)",
    }),
  ],
  variants: {
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

export const overlay = recipe({
  base: [
    {
      bg: "bg.overlay",
      z: "popover",
    },
    style({
      inset: "0",
      position: "fixed",
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
