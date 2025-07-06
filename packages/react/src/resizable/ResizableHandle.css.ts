import { recipe, style } from "../vanilla-extract";

export const handle = recipe({
  base: [
    {
      bg: "bg.secondary",
      border: "1",
      h: "56",
      rounded: "sm",
      w: "12",
    },
    style({
      left: "-6px",
      position: "relative",
    }),
  ],
});

export const root = recipe({
  base: [
    {
      justifyContent: "center",
      ml: "12",
    },
    style({
      boxShadow:
        "-6px 1px 12px -3px rgba(9, 30, 66, 0.08), -4px 0px 5px 0px rgba(9, 30, 66, 0.04)",
    }),
  ],
});
