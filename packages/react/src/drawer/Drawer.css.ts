import { recipe, type RecipeVariants, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "bg.default",
      display: "flex",
      flexDirection: "column",
      shadow: "md",
      z: "popover",
    },
    style({
      position: "fixed",
    }),
  ],
  variants: {
    position: {
      bottom: [
        {
          borderT: "1",
        },
        style({
          bottom: 0,
          left: 0,
          right: 0,
        }),
      ],
      left: [
        {
          borderR: "1",
          h: "full",
          maxW: ["full", "lg"],
          w: ["full", "3/4"],
        },
        style({
          bottom: 0,
          left: 0,
          top: 0,
        }),
      ],
      right: [
        {
          borderL: "1",
          h: "full",
          maxW: ["full", "lg"],
          w: ["full", "3/4"],
        },
        style({
          bottom: 0,
          right: 0,
          top: 0,
        }),
      ],
    },
  },
});

export const overlay = recipe({
  base: [
    {
      bg: "bg.overlay",
      z: "popover",
    },
    style({
      inset: "0",
      position: "fixed",
    }),
  ],
});

export const close = recipe({
  base: [
    {
      rounded: "full",
    },
    style({
      position: "absolute",
      right: 10,
      top: 24,
    }),
  ],
});

export type DrawerVariants = RecipeVariants<typeof content>;
