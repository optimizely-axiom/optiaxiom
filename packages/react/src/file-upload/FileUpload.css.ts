// import { theme } from "@optiaxiom/globals";

// import * as coverStyles from "../cover/Cover.css";
import { recipe, style } from "../vanilla-extract";

export const className = style({});

export const fileUpload = recipe({
  base: [
    className,
    {   
      alignItems: "center", 
      alignSelf: "stretch",
      display: "flex",
      flex: "1",
      flexDirection: "column",
      gap: "8",
      height: "224",
      justifyContent: "center",
      width: "384",
    },
    style({
          background: "#F5F6FA",
          border: "1px dashed #CACFDC",
          borderRadius: 6,
        }),
  ],
});
