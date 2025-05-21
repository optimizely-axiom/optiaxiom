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

export const overlay = recipe({
  base: [
    {
      display: "flex",
      flexWrap: "wrap",
    },
    style({
      inset: "0",
      padding: "16px",
      placeContent: "space-between",
      position: "absolute",
    }),
  ],
});
