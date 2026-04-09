import { recipe, type RecipeVariants, style } from "../vanilla-extract";
import * as styles from "./ButtonRoot.css";

export const icon = recipe({
  variants: {
    /**
     * Whether it is a icon only button or the icon is an addon to the text.
     */
    addon: {
      false: {
        size: "sm",
      },
      true: {},
    },
    /**
     * Whether to display an inverted styled icon box.
     */
    inverse: {
      false: {},
      true: {},
    },
    /**
     * The size of the button.
     */
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  variantsCompounded: [
    {
      style: {
        h: "2xs",
      },
      variants: {
        addon: true,
        size: "sm",
      },
    },
    {
      style: {
        h: "xs",
      },
      variants: {
        addon: true,
        size: "md",
      },
    },
    {
      style: {
        h: "sm",
      },
      variants: {
        addon: true,
        size: "lg",
      },
    },
    {
      style: [
        {
          h: "sm",
          p: "4",
          rounded: "sm",
        },
        style({
          backgroundColor: styles.solidTextColorVar,
          color: styles.accentColorVar,
        }),
      ],
      variants: {
        inverse: true,
        size: "lg",
      },
    },
  ],
});

export type IconVariants = RecipeVariants<typeof icon>;
