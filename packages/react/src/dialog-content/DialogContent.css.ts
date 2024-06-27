import { theme } from "../styles";
import { recipe, style } from "../vanilla-extract";

export const content = recipe({
  base: [
    style({
      maxHeight: "90vh",
      maxWidth: "480px",
      minWidth: "350px",
      position: "relative",
    }),
  ],
});

export const overlay = recipe({
  base: [
    style({
      position: "absolute",
    }),
  ],
});

export const close = recipe({
  base: [
    style({
      borderRadius: "24px",
      position: "absolute",
      right: 10,
      top: 10,

      selectors: {
        "&:hover": { backgroundColor: theme.colors["gray.200"] },
      },
    }),
  ],
});
