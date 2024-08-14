import { style } from "../vanilla-extract";
import { recipe } from "../vanilla-extract";

export const breadcrumbs = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      pt: "xs",
    },
  ],
});

export const list = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      gap: "xs",
    },
  ],
});

export const ellipsis = recipe({
  base: [
    style({
      cursor: "pointer",
    }),
  ],
});
