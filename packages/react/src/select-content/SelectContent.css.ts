import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    style({
      maxHeight: "var(--radix-popover-content-available-height)",
      minWidth: "var(--radix-popover-trigger-width)",
      position: "relative",
    }),
  ],
  variants: {
    open: {
      false: {},
      true: {
        bg: "surface",
        border: "1",
        borderColor: "border.secondary",
        display: "flex",
        flexDirection: "column",
        gap: "2",
        rounded: "lg",
        shadow: "md",
        z: "popover",
      },
    },
  },
});

export const wrapperList = recipe({
  base: [
    style({
      overflow: "auto",
      overscrollBehavior: "contain",
    }),
  ],
});
