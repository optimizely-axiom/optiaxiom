import { type RecipeVariants, recipe } from "../vanilla-extract";

export const header = recipe({
  base: [
    {
      gap: "4",
    },
  ],
  variants: {
    variant: {
      number: {
        flexDirection: "row-reverse",
        justifyContent: "end",
      },
      text: {
        flexDirection: "row",
      },
    },
  },
});

export type DataTableHeaderVariants = RecipeVariants<typeof header>;
