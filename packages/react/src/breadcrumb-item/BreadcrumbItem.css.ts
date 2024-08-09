// import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const breadcrumbItem = recipe({
  base: [
    {
      alignItems: "center",
    },
    style({
      display: "flex",
    }),
  ],
});

export const separator = recipe({
  base: [
    {
      color: "dark.500",
      px: "xs",
    },
  ],
});
