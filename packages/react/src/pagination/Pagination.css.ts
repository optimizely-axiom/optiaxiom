import { recipe } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  ],
});

export const paginationList = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "xs",
    },
  ],
});
