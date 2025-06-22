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
      justifyContent: "center",
    },
    style({
      borderColor: "border.default",
      borderRadius: "lg",
      borderStyle: "dashed",
      borderWidth: "1px",
      height: "224px",
      width: "384px",
    }),
  ],
});
