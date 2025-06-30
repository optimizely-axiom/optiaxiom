import { recipe } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      borderL: "1",
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      h: "full",
      maxW: "lg",
      rounded: "lg",
      w: "1/3",
    },
  ],
});

// export type AsideVariants = RecipeVariants<typeof content>;
