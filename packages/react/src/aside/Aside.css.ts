import { recipe } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      h: "full",
      maxW: "lg",
      rounded: "lg",
      shadow: "lg",
      w: "384",
    },
  ],
});

// export type AsideVariants = RecipeVariants<typeof content>;
