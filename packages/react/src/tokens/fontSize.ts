import { rem } from "./rem";

export const fontSize = {
  xs: {
    fontSize: rem("11px"),
    lineHeight: "1.25",
  },
  sm: {
    fontSize: rem("12px"),
    lineHeight: "1.45",
  },
  md: {
    fontSize: rem("14px"),
    lineHeight: "1.5",
  },
  lg: {
    fontSize: rem("16px"),
    lineHeight: "1.6",
  },
  xl: {
    fontSize: rem("18px"),
    lineHeight: "1.65",
  },
  "2xl": {
    fontSize: rem("20px"),
    lineHeight: "1.6",
  },
  "3xl": {
    fontSize: rem("23px"),
    lineHeight: "1.74",
  },
  "4xl": {
    fontSize: rem("36px"),
    lineHeight: rem("40px"),
  },
  "5xl": {
    fontSize: rem("48px"),
    lineHeight: "1",
  },
  "6xl": {
    fontSize: rem("60px"),
    lineHeight: "1",
  },
} as const;
