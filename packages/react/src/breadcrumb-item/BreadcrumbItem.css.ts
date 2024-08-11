import { recipe } from "../vanilla-extract";

export const breadcrumbItem = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
    },
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
