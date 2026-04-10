import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "16",
      overflow: "auto",
      px: "32",
      py: "24",
      m: "8",
      rounded: "xl",
      bg: "bg.page"
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
