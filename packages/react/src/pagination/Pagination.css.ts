import { recipe, style } from "../vanilla-extract";

export const wrapper = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    style({
      selectors: {
        '&[data-disabled="true"]': {
          opacity: 0.5,
          pointerEvents: "none",
        },
      },
    }),
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
