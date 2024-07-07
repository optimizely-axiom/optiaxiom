import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const badge = recipe({
  base: [
    style({
      textTransform: "capitalize",
    }),
  ],
  variants: {
    type: {
      danger: style({
        backgroundColor: theme.colors["bg.error.solid"],
        color: "white",
      }),
      default: style({
        backgroundColor: theme.colors["border.default"],
        color: theme.colors["fg.default"],
      }),
      primary: style({
        backgroundColor: theme.colors["bg.brand.solid"],
        color: "white",
      }),
      secondary: style({
        backgroundColor: theme.colors["fg.secondary"],
        color: "white",
      }),
      success: style({
        backgroundColor: theme.colors["bg.success.solid"],
        color: "white",
      }),
      warning: style({
        backgroundColor: theme.colors["bg.warning.solid"],
        color: theme.colors["fg.default"],
      }),
    },
  },
});
