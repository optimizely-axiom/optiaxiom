import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      overflow: "auto",
      px: "32",
      py: "24",
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
