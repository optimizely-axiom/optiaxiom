import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.page",
      flexDirection: "column",
      gap: "16",
      m: "4",
      ml: "0",
      overflow: "auto",
      px: "32",
      py: "24",
      rounded: "lg",
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
