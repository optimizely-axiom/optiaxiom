import { recipe, style } from "../vanilla-extract";

export const cardOverflow = recipe({
  base: [
    {
      alignSelf: "stretch",
    },
    style({
      aspectRatio: "2",
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      height: "100%",
      margin: "-16px -16px 0",
    }),
  ],
});
