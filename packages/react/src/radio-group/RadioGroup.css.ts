import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const item = recipe({
  base: [
    style({
      borderColor: theme.colors["fg.tertiary"],
      marginBottom: "3px",
      marginTop: "3px",

      selectors: {
        "&:focus-visible": {
          outline: `2px solid ${theme.colors["brand.300"]}`,
          outlineOffset: "1px",
        },
        "&[data-disabled]": {
          borderColor: theme.colors["border.secondary"],
        },
        "&[data-state='checked']:not([data-disabled])": {
          borderColor: theme.colors["border.brand"],
        },
      },
    }),
  ],
});

export const indicator = recipe({
  base: [
    style({
      position: "relative",

      selectors: {
        "&::after": {
          backgroundColor: theme.colors["fg.brand"],
          borderRadius: "50%",
          content: "",
          display: "block",
          height: "11px",
          width: "11px",
        },
        "&[data-disabled]::after": {
          backgroundColor: theme.colors["border.secondary"],
          borderRadius: "50%",
          content: "",
          display: "block",
          height: "11px",
          width: "11px",
        },
      },
    }),
  ],
});

export const label = recipe({
  base: [
    style({
      lineHeight: "24px",
    }),
  ],
});
