import { globalStyle, recipe, style } from "../vanilla-extract";

const className = style({});

export const chart = recipe({
  base: [
    {
      border: "1",
      borderColor: "border.tertiary",
      fontSize: "sm",
      p: "16",
    },
    style({
      borderRadius: "16px",
    }),
    className,
  ],
});

globalStyle(`${className} :is(g[tabindex="-1"], .recharts-surface)`, {
  outline: "none",
});
