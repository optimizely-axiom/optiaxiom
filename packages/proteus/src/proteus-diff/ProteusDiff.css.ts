import { theme } from "@optiaxiom/react/css-runtime";

import { recipe, style } from "../vanilla-extract";

export const container = recipe({
  base: [
    style({
      border: `1px solid ${theme.colors["border.default"]}`,
      borderRadius: theme.borderRadius.md,
      overflow: "hidden",
    }),
  ],
});

export const diffTable = recipe({
  base: [
    style({
      borderCollapse: "collapse",
      tableLayout: "fixed",
      width: "100%",
    }),
  ],
});

export const headerCell = recipe({
  base: [
    {
      color: "fg.tertiary",
      fontSize: "sm",
      fontWeight: "600",
    },
    style({
      backgroundColor: theme.colors["bg.secondary"],
      borderBottom: `1px solid ${theme.colors["border.default"]}`,
      padding: "6px 12px",
      textAlign: "left",
    }),
  ],
});

export const lineNumber = recipe({
  base: [
    {
      color: "fg.tertiary",
      fontSize: "sm",
    },
    style({
      borderRight: `1px solid ${theme.colors["border.default"]}`,
      padding: "0 8px",
      textAlign: "right",
      userSelect: "none",
      verticalAlign: "top",
      width: "1%",
    }),
  ],
});

export const lineContent = recipe({
  base: [
    {
      fontSize: "sm",
    },
    style({
      fontFamily: theme.fontFamily.mono,
      padding: "0 12px",
      verticalAlign: "top",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
    }),
  ],
  variants: {
    type: {
      added: [
        style({
          backgroundColor: theme.colors["bg.success.subtle"],
        }),
      ],
      empty: [
        style({
          backgroundColor: theme.colors["bg.secondary"],
        }),
      ],
      removed: [
        style({
          backgroundColor: theme.colors["bg.error.subtlest"],
        }),
      ],
      unchanged: [],
    },
  },
});

export const separator = recipe({
  base: [
    style({
      borderRight: `1px solid ${theme.colors["border.default"]}`,
      width: 0,
    }),
  ],
});

export const removedToken = style({
  backgroundColor: theme.colors["bg.error.light"],
  borderRadius: theme.borderRadius.sm,
});

export const addedToken = style({
  backgroundColor: theme.colors["bg.success.light"],
  borderRadius: theme.borderRadius.sm,
});
