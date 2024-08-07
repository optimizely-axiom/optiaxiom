import { type RecipeVariants, style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const breadcrumb = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      pt: "xs",
    },
  ],
});

export const breadcrumbList = recipe({
  base: [
    {
      alignItems: "center",
      // display: "flex",
      // flexDirection: "row",
    },
    style({
      display: "flex",
    }),
  ],
});

export type BreadcrumbsVariants = RecipeVariants<typeof breadcrumb>;
