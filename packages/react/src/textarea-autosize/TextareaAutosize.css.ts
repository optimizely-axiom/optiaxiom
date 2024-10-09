import { mapValues } from "../utils";
import {
  createVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";

const maxRowsVar = createVar();
const maxRowsStyle = style({
  maxHeight: `calc(16px + ${maxRowsVar} * 22px)`,
});

export const wrapper = recipe({
  base: {
    display: "grid",
    flex: "auto",
    overflow: "auto",
  },

  variants: {
    maxRows: mapValues(
      {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      (rows) => [
        maxRowsStyle,
        style({
          vars: {
            [maxRowsVar]: rows,
          },
        }),
      ],
    ),
    resize: {
      auto: {},
      none: {},
      vertical: style({
        resize: "vertical",
      }),
    },
  },
});

const common = style({
  gridArea: "1 / 1 / 2 / 2",
});

export const shadow = recipe({
  base: [
    common,
    style({
      visibility: "hidden",
      whiteSpace: "pre-wrap",
    }),
  ],
});

export const textarea = recipe({
  base: [
    common,
    style({
      resize: "none",
    }),
  ],
});

export type WrapperVariants = RecipeVariants<typeof wrapper>;
