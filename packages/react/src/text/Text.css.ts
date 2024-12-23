import { mapValues } from "../utils";
import { recipe, type RecipeVariants, style } from "../vanilla-extract";

const truncateBase = [
  { overflow: "hidden" } as const,
  style({ textOverflow: "ellipsis" }),
];
const lineClampBase = [
  ...truncateBase,
  style({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  }),
];

export const text = recipe({
  base: {
    fontSize: "md",
  },

  variants: {
    /**
     * Truncate the text at specific number of lines.
     */
    lineClamp: mapValues(
      {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
      } as const,
      (WebkitLineClamp) => [...lineClampBase, style({ WebkitLineClamp })],
    ),
    /**
     * Whether to truncate the text and add an ellipsis at the end.
     */
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
