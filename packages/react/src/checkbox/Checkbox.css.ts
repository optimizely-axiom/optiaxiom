import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

const wrapperMarker = style({});

export const checkbox = recipe({
  base: [
    {
      gap: "0",
    },
    style({
      color: theme.colors["fg.default"],

      selectors: {
        [`&:has(${wrapperMarker}[data-disabled])`]: {
          color: theme.colors["fg.disabled"],
        },
      },
    }),
  ],

  variants: {
    readonly: {
      true: style({
        selectors: {
          [`&:has(${wrapperMarker}[data-disabled])`]: {
            color: theme.colors["fg.default"],
          },
        },
      }),
    },
  },
});

export const iconChecked = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        [`${wrapperMarker} [data-state="checked"] &`]: {
          display: "block",
        },
      },
    }),
  ],
});

export const iconIndeterminate = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        [`${wrapperMarker} [data-state="indeterminate"] &`]: {
          display: "block",
        },
      },
    }),
  ],
});

export const indicatorRoot = recipe({
  base: [
    wrapperMarker,
    {
      border: "1",
      color: "white",
      rounded: "xs",
      size: "16",
    },
    style({
      borderColor: theme.colors["border.active"],

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["outline.brand"]}`,
          outlineOffset: "1px",
        },
        "&:hover": {
          borderColor: theme.colors["fg.tertiary"],
        },
        '&:is([data-state="checked"], [data-state="indeterminate"]) ': {
          border: "none",
        },
        "&[data-disabled]": {
          borderColor: theme.colors["border.secondary"],
          cursor: "not-allowed",
        },
      },
    }),
  ],
});

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      p: "2",
      rounded: "inherit",
      size: "full",
    },
    style({
      backgroundColor: theme.colors["bg.brand.solid"],

      selectors: {
        "&[data-disabled]": {
          backgroundColor: theme.colors["border.secondary"],
        },
        [`${wrapperMarker}:hover &:not([data-disabled])`]: {
          backgroundColor: theme.colors["bg.brand.solid.hover"],
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
        [`${wrapperMarker}[data-disabled] + &`]: {
          cursor: "default",
        },
      },
    }),
  ],
});
