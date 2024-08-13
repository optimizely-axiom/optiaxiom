import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      flexDirection: "row",
      gap: "sm",
      justifyContent: "center",
      px: "sm",
      py: "xs",
      w: "256",
    },
    style({
      selectors: {},
    }),
  ],
});
