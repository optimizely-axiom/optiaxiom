import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "column",
    },
    style({
      left: "50%",
      maxHeight: "75dvh",
      maxWidth: "calc(100dvw - 2 * 24px)",
      position: "fixed",
      top: "12dvh",
      translate: "-50% 0",
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
      fullscreen: style({
        height: "100dvh",
        maxHeight: "none",
        maxWidth: "none",
        top: "0",
        width: "100dvw",
      }),
    },
  },
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
