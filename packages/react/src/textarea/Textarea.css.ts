import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const wrapper = recipe({
  base: {
    flexDirection: "column",
    overflow: "auto",
  },

  variants: {
    resize: {
      auto: {},
      none: {},
      vertical: style({
        resize: "vertical",
      }),
    },
  },
});
export const textarea = recipe({
  base: style({
    resize: "none",
  }),
});

export type WrapperVariants = NonNullable<RecipeVariants<typeof wrapper>>;
