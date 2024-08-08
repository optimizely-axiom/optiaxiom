import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const globalNav = recipe({
  base: style({
    background: theme.colors["bg.brand"],
    overflow: "hidden",
    position: "relative",
    transition: "width 0.2s",
    width: "var(--cmp-navbar-width)",
    zIndex: 1000,
  }),
});

export const orgSwitcher = recipe({
  base: style({
    alignItems: "center",
    display: "flex",
    height: "var(--cmp-navItem-height)",
    margin: "8px 0 22px",
  }),
});

export const navOrg = recipe({
  base: style({
    width: "calc(100% - 68px)",
  }),
});

export const navItem = recipe({
  base: style({
    alignItems: "center",
    color: theme.colors["black"],
    display: "flex",
    height: "var(--cmp-navItem-height)",
    padding: 0,
    textDecoration: "none",

    ":hover": {
      background: theme.colors["bg.brand.solid.hover"],
    },
  }),
  variants: {
    active: {
      true: style({
        background: theme.colors["bg.brand"],
      }),
    },
  },
});

export const navItemIcon = recipe({
  base: style({
    alignItems: "center",
    display: "flex",
    height: "20px",
    margin: "0 16px",
    width: "20px",
  }),
});

export const navItemLabel = recipe({
  base: style({
    fontSize: "14px",
    lineHeight: "24px",
  }),
});

export const navItemLocked = recipe({
  base: style([
    // navItem(),
    {
      opacity: 0.5,
      pointerEvents: "none",
    },
  ]),
});

export const unlockLabel = recipe({
  base: style({
    color: theme.colors["blue.500"],
    cursor: "pointer",
    padding: "8px 16px",
  }),
});

export const toggle = recipe({
  base: style({
    alignItems: "center",
    bottom: "50px",
    cursor: "pointer",
    display: "flex",
    fontSize: "13px",
    padding: "8px 16px",
    position: "absolute",
    width: "100%",
  }),
});

export type GlobalNavVariants = Parameters<typeof globalNav>[0];
