import { recipe, style } from "../vanilla-extract";

export const preview = recipe({
  base: [
    {
      alignSelf: "stretch",
      display: "grid",
      placeItems: "center",
    },
    style({
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      margin: "-16px -16px 8px",
      position: "relative",
    }),
  ],
});
