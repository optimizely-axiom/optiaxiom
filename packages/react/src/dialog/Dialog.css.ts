import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      rounded: "lg",
      shadow: "md",
      z: "popover",
    },
    style({
      left: "50%",
      maxWidth: "calc(100dvw - 2 * 24px)",
      position: "fixed",
      top: "50%",
      translate: "-50% -50%",
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
      bg: "overlay",
      z: "popover",
    },
    style({
      inset: "0",
      position: "fixed",
    }),
  ],
});

export const close = recipe({
  base: [
    {
      rounded: "full",
    },
    style({
      position: "absolute",
      right: 24,
      top: 24,
    }),
  ],
});

export type DialogVariants = RecipeVariants<typeof content>;
