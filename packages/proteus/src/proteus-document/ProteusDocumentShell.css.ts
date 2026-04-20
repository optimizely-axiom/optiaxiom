import { recipe, style } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "16",
    },
  ],
  variants: {
    truncate: {
      false: {},
      true: [
        {
          maxH: "sm",
          overflow: "auto",
          p: "4",
        },
        style({
          margin: "-4px",
        }),
      ],
    },
  },
});
