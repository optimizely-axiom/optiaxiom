import { mapValues } from "../utils";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

const truncateBase = [
  { overflow: "hidden" } as const,
  style({ textOverflow: "ellipsis" }),
];
const lineClampBase = [
  ...truncateBase,
  style({
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
  }),
];

export const text = recipe({
  base: {
    fontSize: "md",
  },

  variants: {
    lineClamp: mapValues(
      {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
      } as const,
      (WebkitLineClamp) => [...lineClampBase, style({ WebkitLineClamp })],
    ),
    truncate: {
      true: [
        ...truncateBase,
        {
          whiteSpace: "nowrap",
        },
      ],
    },
  },
});

export type TextVariants = RecipeVariants<typeof text>;
