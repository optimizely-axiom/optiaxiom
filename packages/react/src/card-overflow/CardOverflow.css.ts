import { recipe, style } from "../vanilla-extract";

export const cardOverflow = recipe({
  base: [
    {
      alignSelf: "stretch",
      overflow: "hidden",
    },
    style({
      aspectRatio: "2",
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      margin: "-16px -16px 0",
    }),
  ],
});
