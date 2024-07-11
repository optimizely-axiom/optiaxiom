import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const triggerWrap = recipe({
  base: [
    style({
      selectors: {
        "&:focus-visible": {
          outline: "0",
        },
      },
    }),
  ],
});

export const trigger = recipe({
  base: [
    {
      mr: "24",
      py: "6",
    },
    style({
      borderBottom: `2px solid ${theme.colors["transparent"]}`,
      color: theme.colors["fg.tertiary"],
      selectors: {
        [`${triggerWrap().className}[data-disabled] &`]: {
          color: theme.colors["border.disabled"],
        },
        [`${triggerWrap().className}[data-state="active"] &`]: {
          borderColor: `${theme.colors["border.brand"]}`,
          color: theme.colors["fg.default"],
        },
      },
    }),
  ],
});
