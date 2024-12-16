import { rem } from "./rem";

export const size = {
  "2xs": rem("16px"),
  xs: rem("20px"),
  sm: rem("24px"),
  md: rem("32px"),
  lg: rem("40px"),
  xl: rem("48px"),
  "3xl": rem("80px"),
} as const;
