import { theme } from "@optiaxiom/globals";

import { rem } from "../utils";
import { recipe, style } from "../vanilla-extract";

/**
 * Marks the item. It takes focus and carries the state attributes, and its
 * row shows them.
 */
const itemMarker = style({});

export const item = recipe({
  base: [
    itemMarker,
    style({
      outline: "none",
    }),
  ],
});

export const group = recipe({
  base: [
    {
      flexDirection: "column",
      gap: "2",
      mt: "2",
    },
    style({
      selectors: {
        // Not a plain `display`: it would override `hidden` on collapsed groups.
        "&:not([hidden])": {
          display: "flex",
        },
      },
    }),
  ],
});

export const row = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      fontSize: "md",
      gap: "8",
      h: "md",
      rounded: "md",
      transition: "colors",
    },
    style({
      color: theme.colors["fg.default"],
      cursor: "pointer",
      /**
       * UI SDK sets `--tree-level` on each item, 1 at the top level. The
       * start padding equals the space above and below the 24px chevron, so
       * the chevron sits evenly inside the rounded row.
       */
      paddingInlineEnd: rem("4px"),
      paddingInlineStart: `calc(${rem("4px")} + (var(--tree-level) - 1) * ${rem("20px")})`,
      userSelect: "none",
      /**
       * A long press opens the item's actions, so iOS shouldn't show its own
       * callout.
       */
      WebkitTouchCallout: "none",

      selectors: {
        [`${itemMarker}:focus-visible > &`]: {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "2px",
        },
        [`${itemMarker}[data-disabled] > &`]: {
          color: theme.colors["fg.disabled"],
          cursor: "default",
        },
        [`${itemMarker}[data-selected] > &`]: {
          backgroundColor: theme.colors["bg.default.pressed"],
        },
      },

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`${itemMarker}:not([data-disabled], [data-selected]) > &:hover`]: {
              backgroundColor: theme.colors["bg.default.hovered"],
            },
          },
        },
      },
    }),
  ],
  variants: {
    editing: {
      false: {},
      // While its label is being edited, a subtle ring marks the whole row.
      true: style({
        outline: `1px solid ${theme.colors["border.focus"]}`,
        outlineOffset: "2px",
      }),
    },
  },
});

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      color: "fg.secondary",
      display: "flex",
      justifyContent: "center",
      rounded: "sm",
      size: "sm",
      transition: "transform",
    },
    style({
      selectors: {
        "&:dir(rtl):not([data-expanded])": {
          transform: "scaleX(-1)",
        },
        "&[data-expanded]": {
          transform: "rotate(90deg)",
        },
      },
    }),
  ],
});

export const addon = recipe({
  base: [
    {
      color: "fg.secondary",
      display: "flex",
      flex: "none",
    },
    style({
      /**
       * The chevron's slot is wider than its glyph, so the addon looks
       * further from the chevron than from the label. Pulling it in evens
       * the two gaps.
       */
      marginInlineStart: rem("-4px"),
    }),
  ],
});
