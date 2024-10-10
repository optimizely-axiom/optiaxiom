import { theme } from "../theme";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      gap: "xs",
      p: "xs",
      rounded: "sm",
      transition: "colors",
    },
    style({
      cursor: "default",
      outline: "none",
      position: "relative",
      userSelect: "none",

      selectors: {
        "&[data-disabled='true']": {
          color: theme.colors["fg.disabled"],
        },
        "&[data-selected='true']": {
          backgroundColor: theme.colors["bg.neutral"],
          color: theme.colors["fg.default"],
          cursor: "pointer",
        },
      },
    }),
  ],
});
