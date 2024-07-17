import { theme } from "../styles";
import { keyframes, recipe, style } from "../vanilla-extract";

export const viewPort = recipe({
  base: [
    style({
      listStyle: "none",
      minWidth: "380px",
      padding: "25px",
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

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${25}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${25}px))` },
});

export const root = recipe({
  base: [
    style({
      borderBottomWidth: "1px",
      borderLeftWidth: "8px",
      borderRightWidth: "1px",
      borderStyle: "solid",
      borderTopWidth: "1px",

      selectors: {
        '&[data-state="closed"]': {
          animation: `${hide} 100ms ease-in`,
        },
        '&[data-state="open"]': {
          animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
        '&[data-swipe="cancel"]': {
          transform: "translateX(0)",
          transition: "transform 200ms ease-out",
        },
        '&[data-swipe="end"]': {
          animation: `${swipeOut} 100ms ease-out`,
        },
        '&[data-swipe="move"]': {
          transform: "translateX(var(--radix-toast-swipe-move-x))",
        },
      },
    }),
  ],
  variants: {
    type: {
      danger: style({
        backgroundColor: theme.colors["bg.error.subtle"],
        borderColor: theme.colors["border.error"],
      }),
      info: style({
        backgroundColor: theme.colors["bg.brand.subtle"],
        borderColor: theme.colors["border.brand"],
      }),
      success: style({
        backgroundColor: theme.colors["bg.success.subtle"],
        borderColor: theme.colors["border.success"],
      }),
      warning: style({
        backgroundColor: theme.colors["bg.warning.subtle"],
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
    },
    style({
      cursor: "pointer",
      marginRight: "14px",
    }),
  ],
});

export const description = recipe({
  base: [
    style({
      display: "block",
      minWidth: "288px",
    }),
  ],
});

export const leftSection = recipe({
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
