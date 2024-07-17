import { theme } from "../styles";
import { createVar, recipe, style } from "../vanilla-extract";

const marker = style({});
export const controlColorVar = createVar();

export const controlBase = recipe({
  base: [
    {
      flexDirection: "row",
      gap: "0",
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
              [controlColorVar]: theme.colors["bg.brand.solid.hover"],
            },
          },
        [`&:has(${marker}:not([data-disabled]):not([data-state="unchecked"]))`]:
          {
            vars: {
              [controlColorVar]: theme.colors["bg.brand.solid"],
            },
          },
        [`&:has(${marker}:not([data-disabled])[data-state="unchecked"]):hover`]:
          {
            vars: {
              [controlColorVar]: theme.colors["border.active.hover"],
            },
          },
        [`&:has(${marker}[data-disabled])`]: {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],
});

export const indicator = recipe({
  base: [
    marker,
    style({
      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&[data-disabled]": {
          vars: {
            [controlColorVar]: theme.colors["bg.disabled"],
          },
        },
      },
    }),
  ],
});

export const label = recipe({
  base: [
    {
      flex: "1",
      pl: "xs",
    },
    style({
      cursor: "pointer",

      selectors: {
        [`${marker}[data-disabled] + &`]: {
          cursor: "default",
        },
      },
    }),
  ],
});
