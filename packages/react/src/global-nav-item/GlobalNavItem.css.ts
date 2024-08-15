import { recipe } from "../vanilla-extract";

export const item = recipe({
  base: [
    {
      alignItems: "center",
      flexDirection: "row",
      gap: "sm",
      h: "lg",
      px: "sm",
      py: "xs",
      w: "full",
    },
  ],
  variants: {
    active: {
      true: {
        bg: "brand.50",
        color: "brand.500",
      },
    },
  },
});
