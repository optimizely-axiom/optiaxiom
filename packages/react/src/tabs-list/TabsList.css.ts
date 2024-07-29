import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const list = recipe({
  base: [
    {
      borderColor: "border.tertiary",
      display: "flex",
    },
    style({
      selectors: {
        '&[data-orientation="horizontal"]': {
          borderBottomWidth: "1px",
          flexDirection: "row",
          gap: theme.spacing.lg,
        },
        '&[data-orientation="vertical"]': {
          borderRightWidth: "1px",
          flexDirection: "column",
          gap: theme.spacing.xs,
        },
      },
    }),
  ],
});
