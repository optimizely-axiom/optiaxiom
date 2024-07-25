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
    fontSize: rem("18px"),
    lineHeight: rem("28px"),
  },
  "2xl": {
    fontSize: rem("20px"),
    lineHeight: rem("28px"),
  },
  "3xl": {
    fontSize: rem("24px"),
    lineHeight: rem("32px"),
  },
  "4xl": {
    fontSize: rem("30px"),
    lineHeight: rem("36px"),
  },
  "5xl": {
    fontSize: rem("36px"),
    lineHeight: rem("40px"),
  },
  "6xl": {
    fontSize: rem("48px"),
    lineHeight: "1",
  },
  "7xl": {
    fontSize: rem("60px"),
    lineHeight: "1",
  },
} as const;
