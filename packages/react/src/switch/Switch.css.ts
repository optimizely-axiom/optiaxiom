import { sprinkles } from "../sprinkles";
import { theme } from "../styles";
import { type RecipeVariants, recipe } from "../vanilla-extract";

export const root = recipe({
  base: {
    backgroundColor: theme.colors["fg.brand"],
    borderColor: "transparent",
    borderRadius: "24px",
    padding: 0,
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
  },
  variants: {
    size: {
      lg: {
        height: "24px",
        width: "44px",
      },
      default: {
        height: "20px",
        width: "40px",
      },
    },
  },
});

export const thumb = recipe({
  base: {
    backgroundColor: "white",
    borderRadius: "24px",
    display: "block",
    transform: "translateX(0px)",
    transition: "transform 100ms",
    willChange: "transform",

    selectors: {
      '&[data-state="checked"]': { transform: "translateX(20px)" },
    },
  },
  variants: {
    size: {
      lg: sprinkles({
        h: "20",
        w: "20",
      }),
      default: sprinkles({
        h: "16",
        w: "16",
      }),
    },
  },
});

export type SwitchVariants = RecipeVariants<typeof root>;
