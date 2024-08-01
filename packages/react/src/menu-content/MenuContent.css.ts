import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      border: "1",
      borderColor: "border.secondary",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      maxW: "xs",
      overflow: "auto",
      p: "4",
      rounded: "lg",
      shadow: "md",
      z: "popover",
    },
    style({
      maxHeight: "var(--radix-dropdown-menu-content-available-height)",
      minWidth: "var(--radix-dropdown-menu-trigger-width)",
    }),
  ],
});
