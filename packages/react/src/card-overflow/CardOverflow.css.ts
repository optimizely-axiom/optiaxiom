import { recipe, style } from "../vanilla-extract";

export const cardOverflow = recipe({
  base: [
    {
      overflow: "hidden",
    },
    style({
      aspectRatio: "2",
      borderTopLeftRadius: "inherit",
      borderTopRightRadius: "inherit",
      margin: "-16px 0px 0px -16px",
      width: "calc(100% + 32px)",
    }),
  ],
});
