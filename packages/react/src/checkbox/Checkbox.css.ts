// import { theme } from "../styles";
import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const checkbox = recipe({
  base: [
    {
      display: "flex",
      flexDirection: "row",
    },
    style({
      gap: "8px",
    }),
  ],
});

export const label = recipe({
  base: [
    style({
      color: theme.colors["fg.default"],
      fontStyle: "normal",
      fontWeight: "400",
      letterSpacing: "-.1px",
      lineHeight: "20px",
    }),
  ],
});
export const indicator = recipe({
  base: [
    style({
      background: theme.colors["bg.brand.solid"],
      color: "black",
    }),
  ],
});
export const leftSection = recipe({
  base: [
    {
      alignItems: "start",
      display: "flex",
    },
    style({
      alignItems: "start",
      padding: "4px 0px",
    }),
  ],
});
export const helperText = recipe({
  base: [
    style({
      color: theme.colors["fg.secondary"],
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      letterSpacing: "0.01px",
      lineHeight: "16px",
    }),
  ],
});

export const checkboxRoot = recipe({
  base: [
    style({
      backgroundColor: theme.colors["white"],
      border: `1px solid ${theme.colors["neutral.500"]}`,
      borderRadius: theme.borderRadius["xs"],
      color: theme.colors.black,
      height: theme.spacing["16"],
      selectors: {
        "&:hover": {
          border: `1px solid ${theme.colors["fg.tertiary"]}`,
        },
      },
      width: theme.spacing["16"],
    }),
  ],
});
