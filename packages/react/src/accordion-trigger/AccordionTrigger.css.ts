import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const trigger = recipe({
  base: [
    {
      flexDirection: "row",
      fontSize: "md",
      fontWeight: "500",
      gap: "xs",
      p: "xs",
      pl: "4",
      rounded: "md",
      textAlign: "start",
      w: "full",
    },
    style({
      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&:hover": {
          color: theme.colors["neutral.1000"],
        },
      },
    }),
  ],
});
export const icon = recipe({
  base: [
    {
      transition: "transform",
    },
  ],
  variants: {
    chevron: {
      end: style({
        selectors: {
          "[data-state=open] > &": {
            transform: "rotate(180deg)",
          },
        },
      }),
      start: style({
        selectors: {
          "[data-state=open] > &": {
            transform: "rotate(90deg)",
          },
        },
      }),
    },
  },
});
