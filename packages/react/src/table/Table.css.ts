import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
      color: "fg.default",
      fontSize: "md",
    },
    style({
      captionSide: "bottom",
      /**
       * Setting the table height to 1px allows cell content to stretch and fill
       * up the whole cell height.
       */
      height: "1px",
    }),
  ],

  variants: {
    layout: {
      auto: [
        {
          w: "full",
        },
        style({
          tableLayout: "auto",
        }),
      ],
      fixed: [
        {
          w: "fit",
        },
        style({
          tableLayout: "fixed",
        }),
      ],
    },
  },
});

export const wrapper = recipe({
  base: [
    {
      bg: "bg.default",
      border: "1",
      borderColor: "border.default",
      maxW: "full",
      overflow: "auto",
      rounded: "lg",
    },
    style({
      position: "relative",
    }),
  ],
});

export type TableVariants = RecipeVariants<typeof table>;
