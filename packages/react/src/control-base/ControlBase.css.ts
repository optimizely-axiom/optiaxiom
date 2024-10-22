import { theme } from "@optiaxiom/globals";

import { createVar, recipe, style } from "../vanilla-extract";

const marker = style({});
export const controlColorVar = createVar();

export const controlBase = recipe({
  base: [
    {
      display: "grid",
    },
    style({
      vars: {
        [controlColorVar]: theme.colors["border.active"],
      },

      color: theme.colors["fg.default"],

      selectors: {
        [`&:has(${marker}:not([data-disabled]):not([data-state="unchecked"])):hover`]:
          {
            vars: {
              [controlColorVar]: theme.colors["bg.accent.hovered"],
            },
          },
        [`&:has(${marker}:not([data-disabled])[data-state="unchecked"]):hover`]:
          {
            vars: {
              [controlColorVar]: theme.colors["border.active.hovered"],
            },
          },
        [`&:has(${marker}:not([data-state="unchecked"]))`]: {
          vars: {
            [controlColorVar]: theme.colors["bg.accent"],
          },
        },
        [`&:has(${marker}[data-disabled])`]: {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],

  variants: {
    description: {
      false: style({
        gridTemplate: `"indicator label" auto / min-content auto`,
      }),
      true: style({
        gridTemplate: `
            "indicator label"       auto
            ".         description" auto / min-content auto`,
      }),
    },
  },
});

export const indicator = recipe({
  base: [
    marker,
    style({
      gridArea: "indicator",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["border.focus"]}`,
          outlineOffset: "1px",
        },
        "&[data-disabled]": {
          opacity: 0.3,
        },
      },
    }),
  ],
});

export const label = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      overflow: "hidden",
      pl: "xs",
    },
    style({
      gridArea: "label",

      selectors: {
        [`${marker}:not([data-disabled]) + &`]: {
          cursor: "pointer",
        },
      },
    }),
  ],
});

export const description = recipe({
  base: [
    {
      fontSize: "sm",
      pl: "xs",
    },
    style({
      gridArea: "description",
    }),
  ],
});
