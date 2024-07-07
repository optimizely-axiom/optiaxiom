import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const badge = recipe({
  base: [
    style({
      display: "inline-block",
      textAlign: "center",
      textTransform: "capitalize",
    }),
  ],
  variants: {
    type: {
      danger: style({
        backgroundColor: theme.colors["fg.error"],
        color: "white",
      }),
      default: style({
        backgroundColor: theme.colors["brand.200"],
        color: theme.colors["dark.600"],
      }),
      primary: style({
        backgroundColor: theme.colors["fg.brand"],
        color: "white",
      }),
      secondary: style({
        backgroundColor: theme.colors["fg.secondary"],
        color: "white",
      }),
      success: style({
        backgroundColor: theme.colors["bg.success"],
        color: theme.colors["dark.600"],
      }),
      warning: style({
        backgroundColor: theme.colors["bg.warning.solid"],
        color: "white",
      }),
    },
  },
});
