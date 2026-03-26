import { rem } from "./rem";

export const borderRadius = {
  xs: rem("2px"),
  sm: rem("6px"),
  md: rem("8px"),
  lg: rem("12px"),
  xl: rem("16px"),

  full: "9999px",
} as const;
