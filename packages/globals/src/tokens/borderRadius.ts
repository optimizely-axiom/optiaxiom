import { rem } from "./rem";

export const borderRadius = {
  xs: rem("2px"),
  sm: rem("4px"),
  md: rem("6px"),
  lg: rem("8px"),
  xl: rem("12px"),

  full: "9999px",
  none: "0",
} as const;
