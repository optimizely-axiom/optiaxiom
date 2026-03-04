import { globalStyle, recipe, style } from "../vanilla-extract";

const className = style({});

export const chart = recipe({
  base: [
    {
      fontSize: "sm",
    },
    className,
  ],
});

globalStyle(`${className} :is(g[tabindex="-1"], .recharts-surface)`, {
  outline: "none",
});
