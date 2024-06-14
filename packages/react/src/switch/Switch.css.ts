import { sprinkles } from "../sprinkles";
import { theme } from "../styles";
import { type RecipeVariants, recipe, style } from "../vanilla-extract";

export const wrapper = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
});

export const switchRoot = recipe({
  base: {
    all: "unset",
    backgroundColor: theme.colors["fg.brand"],
    borderRadius: "24px",
    position: "relative",

    selectors: {
      "&:focus-visible": {
        outline: "1px",
        outlineColor: theme.colors["fg.brand.hover"],
        outlineOffset: "2px",
        outlineStyle: "solid",
        outlineWidth: "2px",
      },
      "&:hover": {
        backgroundColor: theme.colors["fg.brand.hover"],
      },
      "&[data-disabled]": {
        backgroundColor: theme.colors["border.secondary"],
        cursor: "not-allowed",
      },
      '&[data-state="unchecked"]&:not([data-disabled])': {
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

export const switchThumb = recipe({
  base: {
    backgroundColor: "white",
    borderRadius: "24px",
    display: "block",
    transform: "translateX(2px)",
    transition: "transform 100ms",
    willChange: "transform",

    selectors: {
      '&[data-state="checked"]': { transform: "translateX(22px)" },
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

export type SwitchVariants = RecipeVariants<typeof switchRoot>;
