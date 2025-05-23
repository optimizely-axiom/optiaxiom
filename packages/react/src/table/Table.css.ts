import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    {
      color: "fg.default",
      fontSize: "md",
      w: "full",
    },
    style({
      captionSide: "bottom",
    }),
  ],

  variants: {
    /**
     * Use default table layout or grid for rows and cells.
     */
    layout: {
      auto: [
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
