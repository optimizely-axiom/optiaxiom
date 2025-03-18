import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: {
    flex: "1",
    flexDirection: "row",
    fontSize: "md",
    gap: "8",
    overflowX: "hidden",
    transition: "opacity",
  },

  variants: {
    expanded: {
      false: style({
        opacity: "0",
      }),
      true: style({
        opacity: "1",
      }),
    },
  },
});
