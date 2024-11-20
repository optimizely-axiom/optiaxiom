import { recipe, style } from "../vanilla-extract";

export const backdrop = recipe({
  base: [
    {
      bg: "bg.overlay",
      z: "popover",
    },
    style({
      backdropFilter: "blur(4px)",
      inset: "0",
      position: "fixed",
    }),
  ],
});
