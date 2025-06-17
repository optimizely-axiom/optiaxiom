import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      borderL: "1",
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      rounded: "lg",
    },
    style({
      bottom: 0,
      height: "100%",
      maxWidth: ["100%", "lg"],
      position: "fixed",
      right: 0,
      top: 0,
      width: ["100%", "33%"],
    }),
  ],
});

// export type AsideVariants = RecipeVariants<typeof content>;
