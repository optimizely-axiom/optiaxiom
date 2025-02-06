import { rem } from "./rem";

export const fontSize = {
  xs: {
    fontSize: rem("10px"),
    lineHeight: rem("14px"),
  },
  sm: {
    fontSize: rem("12px"),
    lineHeight: rem("16px"),
  },
  md: {
    fontSize: rem("14px"),
    lineHeight: rem("20px"),
  },
  lg: {
    fontSize: rem("16px"),
    lineHeight: rem("24px"),
  },
  xl: {
    fontSize: rem("20px"),
    lineHeight: rem("28px"),
  },
  "2xl": {
    fontSize: rem("24px"),
    lineHeight: rem("32px"),
  },
  "3xl": {
    fontSize: rem("28px"),
    lineHeight: rem("40px"),
  },
  "4xl": {
    fontSize: rem("32px"),
    lineHeight: rem("44px"),
  },
} as const;
