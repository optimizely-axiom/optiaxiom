import { recipe, style } from "../vanilla-extract";

export const animatedElement = recipe({
  base: style({
    backgroundColor: "white",
    borderRadius: "0.75rem", // equivalent to rounded-xl
    outline: "none",
    position: "absolute",
    width: "100%",
    zIndex: 10,
  }),
  variants: {
    open: {
      false: {
        display: "none",
      },
      true: {
        display: "block",
      },
    },
  },
});

export const listBox = recipe({
  base: [
    {
      mt: "4",
    },
    style({
      position: "relative",
    }),
  ],
});

export const list = recipe({
  base: [
    {
      rounded: "lg",
      shadow: "sm",
    },
  ],
});

export const empty = recipe({
  base: [
    {
      px: "8",
      py: "12",
      rounded: "xs",
    },
    style({
      textAlign: "center",
      userSelect: "none",
    }),
  ],
});
