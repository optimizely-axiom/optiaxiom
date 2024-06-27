import { theme } from "../styles";
import { style } from "../vanilla-extract";

export const dialogContent = style({
  backgroundColor: "white",
  left: "50%",
  position: "fixed",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

export const dialogOverlay = style({
  backgroundColor: theme.colors["dark.200"],
  position: "fixed",
});
