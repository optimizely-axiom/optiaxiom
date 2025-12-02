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
     *
     * Size guidelines:
     * - sm (400px): Simple forms, confirmations, 1-2 input fields
     * - md (600-800px, default): Standard forms, 3-5 fields, medium content
     * - lg (900-1400px): Complex forms, wide tables, multi-column layouts
     * - fullscreen: Very large content, editors, dashboards
     *
     * 💡 Tip: When matching designs from screenshots, compare the content
     * density and layout complexity against these guidelines. Start with 'md'
     * (default) and only increase if the design clearly shows wider content or
     * multi-column layouts.
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
