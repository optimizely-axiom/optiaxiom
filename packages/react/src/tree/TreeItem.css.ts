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
    },
    style({
      // Not the `mt` sprinkle: opening and closing animate it.
      marginTop: rem("2px"),

      selectors: {
        // Not a plain `display`: it would override `hidden` on collapsed groups.
        "&:not([hidden])": {
          display: "flex",
        },
      },
    }),
  ],

  variants: {
    animated: {
      false: {},
      true: style({
        /**
         * UI SDK sets `--tree-group-height` to the group's pixel height while
         * it opens or closes, and to `auto` once it settles. Clipping keeps
         * rows from spilling over the items below meanwhile, with room for
         * their 4px focus rings.
         */
        clipPath: `inset(${rem("-4px")})`,
        height: "var(--tree-group-height)",
        transitionDuration: theme.duration.md,
        transitionProperty: "height, margin-top, opacity, transform",
        transitionTimingFunction: "ease",

        selectors: {
          "&[data-starting-style], &[data-ending-style]": {
            height: 0,
            marginTop: 0,
            opacity: 0,
            transform: `translateY(${rem("-8px")})`,
          },
        },
      }),
    },
  },
});

/**
 * Marks the row, so the actions button can show while it's hovered.
 */
const rowMarker = style({});

export const row = recipe({
  base: [
    rowMarker,
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

export const icon = recipe({
  base: [
    {
      color: "fg.secondary",
      display: "flex",
      flex: "none",
    },
    style({
      /**
       * The chevron's slot is wider than its glyph, so the icon looks
       * further from the chevron than from the label. Pulling it in evens
       * the two gaps.
       */
      marginInlineStart: rem("-4px"),
    }),
  ],
});

/**
 * Marks the end addon, so the actions button sits right after it.
 */
const addonAfterMarker = style({});

export const addonAfter = recipe({
  base: [
    addonAfterMarker,
    {
      alignItems: "center",
      display: "flex",
      flex: "none",
      gap: "4",
    },
    style({
      marginInlineStart: "auto",
    }),
  ],
});

export const actions = recipe({
  base: [
    {
      display: "flex",
      flex: "none",
    },
    style({
      marginInlineStart: "auto",
      visibility: "hidden",

      selectors: {
        // Not a second `auto` margin: the free space would split between the two.
        [`${addonAfterMarker} + &`]: {
          marginInlineStart: 0,
        },
        [`${itemMarker}[data-selected] > ${rowMarker} &`]: {
          visibility: "visible",
        },
      },

      "@media": {
        "(hover: hover)": {
          selectors: {
            [`${rowMarker}:hover &`]: {
              visibility: "visible",
            },
          },
        },
      },
    }),
  ],

  variants: {
    open: {
      false: {},
      true: style({
        visibility: "visible",
      }),
    },
  },
});
