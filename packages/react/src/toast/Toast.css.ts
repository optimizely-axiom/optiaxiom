import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const viewPort = recipe({
  base: [
    {
      p: "24",
      z: "popover",
    },
    style({
      outline: "none",
      position: "fixed",
    }),
  ],
  variants: {
    position: {
      bottom: style({
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
      }),
      "bottom-left": style({
        bottom: 0,
        left: 0,
      }),
      "bottom-right": style({
        bottom: 0,
        right: 0,
      }),
      top: style({
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
      }),
      "top-left": style({
        left: 0,
        top: 0,
      }),
      "top-right": style({
        right: 0,
        top: 0,
      }),
    },
  },
});

export const root = recipe({
  base: [
    {
      alignItems: "center",
      w: "384",
    },
    style({
      borderBottomWidth: "1px",
      borderLeftWidth: "8px",
      borderRightWidth: "1px",
      borderStyle: "solid",
      borderTopWidth: "1px",
      maxWidth: "90dvw",
    }),
  ],
  variants: {
    type: {
      danger: style({
        backgroundColor: theme.colors["bg.error"],
        borderColor: theme.colors["border.error"],
      }),
      info: style({
        backgroundColor: theme.colors["bg.brand"],
        borderColor: theme.colors["border.brand"],
      }),
      success: style({
        backgroundColor: theme.colors["bg.success"],
        borderColor: theme.colors["border.success"],
      }),
      warning: style({
        backgroundColor: theme.colors["bg.warning"],
        borderColor: theme.colors["border.warning"],
      }),
    },
  },
});

export const close = recipe({
  base: [
    {
      flex: "none",
      rounded: "sm",
      size: "20",
    },
    style({
      cursor: "pointer",
      marginRight: "14px",
    }),
  ],
});

export const description = recipe({
  base: [
    {
      flex: "auto",
    },
    style({
      maxWidth: "65dvw",
      width: "288px",
    }),
  ],
});

export const startDecorator = recipe({
  base: [
    {
      flex: "none",
    },
    style({
      height: "20px",
      width: "16px",
    }),
  ],
});
