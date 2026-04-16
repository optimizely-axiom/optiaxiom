import { theme } from "@optiaxiom/globals";

import {
  createGlobalVar,
  recipe,
  type RecipeVariants,
  style,
} from "../vanilla-extract";
import * as styles from "./ButtonRoot.css";

const iconSizeVar = createGlobalVar("ax-styles-iconSize");

export const icon = recipe({
  variants: {
    /**
     * Whether it is a icon only button or the icon is an addon to the text.
     */
    addon: {
      false: style({
        height: theme.size.sm,
        width: theme.size.sm,
      }),
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
      style: style({
        vars: {
          [iconSizeVar]: theme.size["2xs"],
        },
      }),
      variants: {
        addon: true,
        size: "sm",
      },
    },
    {
      style: style({
        vars: {
          [iconSizeVar]: theme.size.xs,
        },
      }),
      variants: {
        addon: true,
        size: "md",
      },
    },
    {
      style: style({
        vars: {
          [iconSizeVar]: theme.size.xs,
        },
      }),
      variants: {
        addon: true,
        size: "lg",
      },
    },
    {
      style: [
        {
          rounded: "sm",
        },
        style({
          backgroundColor: styles.solidTextColorVar,
          color: styles.accentColorVar,
          height: "auto",
          padding: "4px",
          width: "28px",

          selectors: {
            "&[data-prefix]": {
              paddingBlock: "6px",
            },
          },
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
