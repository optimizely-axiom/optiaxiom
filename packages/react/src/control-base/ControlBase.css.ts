import { theme } from "../theme";
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
      gridTemplate: `
            "indicator label"       auto
            ".         description" auto / min-content auto`,

      selectors: {
        [`&:has(${marker}:not([data-disabled]):not([data-state="unchecked"])):hover`]:
          {
            vars: {
              [controlColorVar]: theme.colors["bg.brand.solid.hover"],
            },
          },
        [`&:has(${marker}:not([data-disabled])[data-state="unchecked"]):hover`]:
          {
            vars: {
              [controlColorVar]: theme.colors["border.active.hover"],
            },
          },
        [`&:has(${marker}:not([data-state="unchecked"]))`]: {
          vars: {
            [controlColorVar]: theme.colors["bg.brand.solid"],
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
      gridArea: "indicator",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
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
