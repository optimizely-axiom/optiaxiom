import { theme } from "../styles";
import { style } from "../vanilla-extract";

export const content = style({
  backgroundColor: "white",
  boxShadow: "0 2px 4px 0 #464568",
  maxHeight: "90vh",
  maxWidth: "480px",
  minWidth: "350px",
  position: "absolute",
});

export const overlay = style({
  backgroundColor: theme.colors["dark.200"],
  position: "absolute",
});
