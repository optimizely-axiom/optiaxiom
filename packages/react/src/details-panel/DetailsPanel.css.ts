import { recipe, style } from "../vanilla-extract";

export const root = recipe({
  base: [
    {
      bg: "bg.default",
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      h: "full",
      overflow: "auto",
    },
    style({
      selectors: {
        "&:focus-visible": {
          outline: "none",
        },
      },
    }),
  ],
});
