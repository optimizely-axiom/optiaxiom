import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      color: "fg.default",
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
        width: "clamp(600px, 50%, 800px)",
      }),
      lg: style({
        width: "clamp(900px, 75%, 1400px)",
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

export type DialogVariants = RecipeVariants<typeof content>;
