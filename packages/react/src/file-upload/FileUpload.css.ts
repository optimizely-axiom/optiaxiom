import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const fileUpload = recipe({
  base: [
    {
      alignItems: "center", 
      alignSelf: "stretch",
      bg: "bg.secondary",
      display: "flex",
      flex: "1",
      flexDirection: "column",
      gap: "8",
      h: "224",
      justifyContent: "center",
      w: "384",
    },
    style({
      borderColor: "border.default",
      borderRadius: "lg",
      borderStyle: "dashed",
      borderWidth: "1px",
    }),
  ],
});
