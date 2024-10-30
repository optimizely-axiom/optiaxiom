import { recipe, type RecipeVariants, style } from "../vanilla-extract";

const marker = style({});

export const header = recipe({
  base: [
    {
      gap: "4",
    },
    marker,
  ],
  variants: {
    sortable: {
      false: style({
        cursor: "default",
      }),
      true: style({
        cursor: "pointer",
      }),
    },
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

export const icon = recipe({
  base: [
    {
      border: "0",
      color: "fg.tertiary",
    },
  ],
  variants: {
    sorted: {
      false: style({
        selectors: {
          [`${marker}:is(:not(:focus-within):not(:hover)) &`]: {
            visibility: "hidden",
          },
        },
      }),
      true: {},
    },
  },
});

export type DataTableHeaderVariants = RecipeVariants<typeof header>;
