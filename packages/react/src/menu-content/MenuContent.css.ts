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
      p: "4",
      rounded: "lg",
      shadow: "md",
    },
    style({
      minWidth: "var(--radix-dropdown-menu-trigger-width)",
    }),
  ],
});
