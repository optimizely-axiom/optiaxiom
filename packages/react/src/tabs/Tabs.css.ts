import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";
export const trigger = recipe({
  base: style({
    borderBottom: `1px solid ${theme.colors["gray.400"]}`,
    selectors: {
      "&:hover": { color: theme.colors["gray.400"] },
      '&[data-state="active"]': {
        borderBottom: "2px solid",
        borderColor: theme.colors["border.brand"],
      },
    },
  }),
});

export const content = recipe({
  base: style({}),
});
