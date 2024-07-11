import {
  type RecipeVariants,
  createVar,
  recipe,
  style,
} from "../vanilla-extract";

export const sizeVar = createVar();
export const dialog = recipe({
  base: [],
  variants: {
    size: {
      sm: style({
        vars: {
          [sizeVar]: "375px",
        },
      }),
      md: style({
        vars: {
          [sizeVar]: "600px",
        },
      }),
      lg: style({
        vars: {
          [sizeVar]: "800px",
        },
      }),
    },
  },
});

export type DialogVariants = RecipeVariants<typeof dialog>;
