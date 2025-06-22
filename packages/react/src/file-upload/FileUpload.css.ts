import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const fileUpload = recipe({
  base: [
    {
      alignItems: "center", 
      bg: "bg.secondary",
      border: "1",
      borderColor: "border.default",
      flex: "1",
      gap: "8",
      h: "224",
      justifyContent: "center",
      rounded: "lg",
      w: "384",
    },
    style({
      borderStyle: "dashed",
    }),
  ],
});
