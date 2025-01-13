import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      borderColor: "border.default",
      display: "flex",
    },
    style({
      selectors: {
        '&[data-orientation="horizontal"]': {
          borderBottomWidth: "1px",
          flexDirection: "row",
          gap: "24px",
        },
        '&[data-orientation="vertical"]': {
          borderRightWidth: "1px",
          flexDirection: "column",
          gap: "8px",
        },
      },
    }),
  ],
});
