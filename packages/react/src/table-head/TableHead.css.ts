import { recipe, style } from "../vanilla-extract";

export const head = recipe({
  base: [
    {
      borderB: "1",
      borderColor: "border.tertiary",
      color: "fg.tertiary",
      fontSize: "sm",
      fontWeight: "400",
      px: "16",
      py: "12",
      textAlign: "start",
    },
    style({
      minHeight: "44px",
      verticalAlign: "middle",

      selectors: {
        "table:not(:has(tbody tr)) &": {
          borderBottom: "none",
        },
      },
    }),
  ],
});
