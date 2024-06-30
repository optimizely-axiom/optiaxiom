import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const root = recipe({
  base: [
    style({
      backgroundColor: theme.colors["fg.brand"],
      position: "relative",

      selectors: {
        "&:focus-visible": {
          outline: `${theme.colors["brand.300"]} solid 2px`,
          outlineOffset: "1px",
        },
        "&:hover": {
          backgroundColor: theme.colors["fg.brand.hover"],
        },
        "&[data-disabled]": {
          backgroundColor: theme.colors["border.secondary"],
          cursor: "not-allowed",
        },
        '&[data-state="unchecked"]:not([data-disabled])': {
          backgroundColor: theme.colors["border.default"],
        },
      },
    }),
  ],
  variants: {
    size: {
      lg: style({
        height: "24px",
        width: "44px",
      }),
      default: style({
        height: "20px",
        width: "40px",
      }),
    },
  },
});

export const thumb = recipe({
  base: [
    style({
      display: "block",
      transform: "translateX(2px)",
      transition: "transform 100ms",
      willChange: "transform",

      selectors: {
        '&[data-state="checked"]': { transform: "translateX(22px)" },
      },
    }),
  ],
  variants: {
    size: {
      lg: {
        h: "20",
        w: "20",
      },
      default: {
        h: "16",
        w: "16",
      },
    },
  },
});

export type SwitchVariants = RecipeVariants<typeof root>;
