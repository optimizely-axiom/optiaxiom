import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";
import * as bodyStyles from "./DialogBody.css";

export const nestedDialogCountVar = createVar();
export const scrollPaddingBottomVar = createVar();
export const scrollPaddingTopVar = createVar();

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

export const content = recipe({
  base: [
    {
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
    },
    style({
      left: "50%",
      maxHeight: "75dvh",
      maxWidth: "calc(100dvw - 2 * 24px)",
      position: "fixed",
      top: "12dvh",
      transform: `
        translateY(calc(1rem * ${nestedDialogCountVar}))
        scale(calc(1 - 0.06 * ${nestedDialogCountVar}))
      `,
      translate: "-50% 0",

      selectors: {
        "&:focus-visible": {
          outline: "none",
        },
        [`&:has(${bodyStyles.className}:focus-within)`]: {
          scrollPaddingBottom: scrollPaddingBottomVar,
          scrollPaddingTop: scrollPaddingTopVar,
        },
      },
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
