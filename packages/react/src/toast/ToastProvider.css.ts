import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const gap = "16";
export const padding = "24";

export const viewport = recipe({
  base: [
    {
      gap,
      justifyContent: "normal",
      maxH: "full",
      overflowX: "hidden",
      overflowY: "auto",
      p: padding,
      w: ["full", "384"],
      z: "toast",
    },
    style({
      outline: "none",
      pointerEvents: "none",
      position: "fixed",
      scrollbarGutter: "stable",
    }),
  ],
  variants: {
    position: {
      bottom: style({
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
      }),
      "bottom-left": style({
        bottom: 0,
        left: 0,
      }),
      "bottom-right": style({
        bottom: 0,
        right: 0,
      }),
      top: style({
        left: "50%",
        marginTop: "40px",
        top: 0,
        transform: "translateX(-50%)",
      }),
      "top-left": style({
        left: 0,
        marginTop: "40px",
        top: 0,
      }),
      "top-right": style({
        marginTop: "40px",
        right: 0,
        top: 0,
      }),
    },
  },
});

export type ViewportVariants = RecipeVariants<typeof viewport>;
