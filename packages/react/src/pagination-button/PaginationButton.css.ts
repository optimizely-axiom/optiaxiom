import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const paginationButton = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      fontSize: "md",
      gap: "2",
      h: "md",
      justifyContent: "center",
      px: "8",
      rounded: "md",
      transition: "colors",
    },
    style({
      color: theme.colors["fg.default"],
      minWidth: theme.size.md,
      userSelect: "none",

      selectors: {
        "&:not([data-disabled]):hover": {
          backgroundColor: theme.colors["bg.neutral"],
        },
        '&[data-state="on"]': {
          backgroundColor: theme.colors["bg.brand"],
          color: theme.colors["fg.link"],
        },

        "&[data-disabled]": {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
});
