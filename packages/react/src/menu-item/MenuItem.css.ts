import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      fontSize: "md",
      h: "40",
      justifyContent: "start",
      px: "xs",
      rounded: "sm",
    },
    style({
      selectors: {
        '&:active:not([data-disabled="true"])': {
          background: theme.colors["fg.default"],
        },
        "&:hover": {
          background: theme.colors["bg.default.hover"],
        },
      },
    }),
  ],
});

export const decorator = recipe({
  base: [
    {
      alignItems: "center",
      justifyContent: "center",
      size: "20",
    },
  ],
  variants: {
    position: {
      end: {
        mr: "0",
      },
      start: {
        ml: "0",
      },
    },
  },
});
