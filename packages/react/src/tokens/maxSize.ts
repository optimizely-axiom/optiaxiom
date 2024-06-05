import { rem } from "./rem";

export const maxSize = {
  xs: rem("320px"),
  sm: rem("384px"),
  md: rem("448px"),
  lg: rem("512px"),
  xl: rem("576px"),
  "2xl": rem("672px"),

  full: "100%",
} as const;
