import { recipe, style } from "../vanilla-extract";

export const cardOverflow = recipe({
  base: [
    {
      alignSelf: "stretch",
    },
    style({}),
  ],

  variants: {
    orientation: {
      horizontal: [
        style({
          borderBottomLeftRadius: "inherit",
          borderTopLeftRadius: "inherit",
          margin: "-16px 0 -16px -16px",
        }),
      ],
      vertical: [
        style({
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          margin: "-16px -16px 0",
        }),
      ],
    },
  },
});
