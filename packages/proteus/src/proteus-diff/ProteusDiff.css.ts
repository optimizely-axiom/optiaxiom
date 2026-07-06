import { theme } from "@optiaxiom/react/css-runtime";

import { recipe, style } from "../vanilla-extract";

export const table = recipe({
  base: [
    style({
      borderCollapse: "collapse",
      width: "100%",
    }),
  ],
});

export const th = recipe({
  base: [
    {
      color: "fg.tertiary",
      fontSize: "sm",
      fontWeight: "600",
    },
    style({
      borderBottom: `1px solid ${theme.colors["border.default"]}`,
      padding: "8px 12px",
      textAlign: "left",
    }),
  ],
});

export const td = recipe({
  base: [
    {
      fontSize: "sm",
    },
    style({
      borderBottom: `1px solid ${theme.colors["border.default"]}`,
      padding: "8px 12px",
      verticalAlign: "top",
    }),
  ],
});

export const fieldCell = recipe({
  base: [
    {
      fontWeight: "500",
    },
  ],
});
