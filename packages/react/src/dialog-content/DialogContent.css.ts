import * as styles from "../dialog/Dialog.css";
import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    {
      bg: "white",
      rounded: "lg",
      shadow: "md",
    },
    style({
      position: "relative",
      width: styles.sizeVar,
    }),
  ],
});

export const overlay = recipe({
  base: [
    {
      alignItems: "center",
      bg: "dark.200",
      size: "full",
    },
    style({
      position: "absolute",
    }),
  ],
});

export const close = recipe({
  base: [
    {
      p: "2",
      rounded: "full",
      size: "20",
    },
    style({
      position: "absolute",
      right: 24,
      top: 24,

      selectors: {
        "&:hover": { backgroundColor: theme.colors["gray.200"] },
      },
    }),
  ],
});
