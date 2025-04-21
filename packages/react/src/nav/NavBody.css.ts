import { recipe } from "../vanilla-extract";

export const body = recipe({
  base: [
    {
      flex: "1",
      gap: "4",
      justifyContent: "flex-start",
      overflowX: "hidden",
      py: "8",
      w: "full",
    },
  ],

  variants: {
    expanded: {
      false: {
        overflowY: "hidden",
      },
      true: {
        overflowY: "auto",
      },
    },
  },
});
