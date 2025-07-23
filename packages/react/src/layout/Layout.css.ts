import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const layout = recipe({
  base: [
    {
      bg: "bg.page",
      display: "flex",
      flexDirection: "column",
      fontSize: "md",
    },
    style({
      position: "relative",
    }),
  ],

  variants: {
    /**
     * Whether to fit the layout to the browser screen or the parent element.
     */
    size: {
      full: style({
        height: "100%",
        width: "100%",
      }),
      screen: style({
        height: "100vh",
        width: "100vw",
      }),
    },
  },
});

export type LayoutVariants = RecipeVariants<typeof layout>;
