import { recipe, style } from "../vanilla-extract";

export const kbd = recipe({
  base: [
    {
      alignItems: "center",
      border: "1",
      display: "inline-flex",
      flexDirection: "row",
      fontWeight: "600",
      gap: "4",
      whiteSpace: "nowrap",
    },
    style({
      borderBottomWidth: "2px",
    }),
  ],
});

export const keys = recipe({
  base: style({
    fontSize: "1.2em",
    lineHeight: "1",
    textDecoration: "none",
  }),
});
