import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";
const wrapperMarker = style({});

export const wrapper = recipe({
  base: [
    {
      gap: "0",
    },
    wrapperMarker,
  ],
  variants: {
    disabled: {
      true: style({
        cursor: "not-allowed",
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

export const iconUnchecked = recipe({
  base: [
    style({
      display: "none",
      selectors: {
        [`${wrapperMarker} [data-state="unchecked"] &`]: {
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

export const indicator = recipe({
  base: [
    {
      alignItems: "center",
      color: "black",
      display: "flex",
      h: "full",
      justifyContent: "center",
      rounded: "xs",
    },
    style({
      background: theme.colors["bg.brand.solid"],
      selectors: {
        "&:hover": {
          background: theme.colors["bg.brand.solid.hover"],
        },
      },
    }),
  ],
  variants: {
    disabled: {
      true: style({
        background: theme.colors["fg.disabled"],
        cursor: "not-allowed",
      }),
    },
  },
});

export const indicatorWrapper = recipe({
  base: [
    {
      border: "1",
      justifyContent: "center",
      rounded: "xs",
      size: "16",
    },
    style({
      borderColor: theme.colors["neutral.500"],
      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["brand.300"]}`,
          outlineOffset: "1px",
        },
        "&:hover": {
          borderColor: theme.colors["fg.tertiary"],
        },

        '&[data-state="checked"] ': {
          border: "none",
        },
        '&[data-state="indeterminate"]': {
          border: "none",
        },
      },
    }),
  ],
  variants: {
    disabled: {
      false: {},
      true: style({
        borderColor: theme.colors["gray.400"],
        cursor: "not-allowed",
      }),
    },
  },
});

export const label = recipe({
  base: [
    {
      fontSize: "md",
    },
    style({
      cursor: "pointer",
    }),
  ],
  variants: {
    disabled: {
      false: {},
      true: style({
        color: theme.colors["fg.disabled"],
        cursor: "not-allowed",
      }),
    },
  },
});

export const endDecorator = recipe({
  base: [
    {
      fontSize: "sm",
      ml: "24",
    },
    style({
      cursor: "pointer",
    }),
  ],
  variants: {
    disabled: {
      false: {},
      true: style({
        color: theme.colors["fg.disabled"],
        cursor: "not-allowed",
      }),
    },
  },
});
