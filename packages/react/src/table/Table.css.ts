import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
      color: "fg.default",
      fontSize: "md",
    },
    style({
      captionSide: "bottom",
    }),
  ],

  variants: {
    layout: {
      auto: [
        {
          w: "full",
        },
        style({
          /**
           * Setting the table height to 1px allows cell content to stretch and fill
           * up the whole cell height.
           */
          height: "1px",
        }),
      ],
      fixed: [
        {
          display: "grid",
          w: "fit",
        },
        style({
          isolation: "isolate",
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
      borderColor: "border.tertiary",
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
