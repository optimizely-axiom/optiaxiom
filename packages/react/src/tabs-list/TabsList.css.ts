import { theme } from "../theme";
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
          flexDirection: "row",
        },
        '&[data-orientation="vertical"]': {
          flexDirection: "column",
        },
      },
    }),
  ],
  variants: {
    appearance: {
      primary: style({
        selectors: {
          '&[data-orientation="horizontal"]': {
            borderBottomWidth: "1px",
            gap: theme.spacing.lg,
          },
          '&[data-orientation="vertical"]': {
            borderRightWidth: "1px",
            gap: theme.spacing.xs,
          },
        },
      }),
      secondary: style({
        selectors: {
          '&[data-orientation="horizontal"]': {
            gap: theme.spacing.md,
          },
          '&[data-orientation="vertical"]': {
            gap: theme.spacing.xs,
          },
        },
      }),
    },
  },
});
