import { rem } from "./rem";

export const size = {
  "2xs": rem("16px"),
  xs: rem("20px"),
  sm: rem("24px"),
  md: rem("32px"),
  lg: rem("40px"),
  xl: rem("48px"),
  "5xl": rem("80px"),

  "0": "0",
  "10": rem("10px"),
  "12": rem("12px"),
  "56": rem("56px"),
  "224": rem("224px"),
  "384": rem("384px"),

  "1/2": "50%",

  "1/3": "33.333333%",
  "2/3": "66.666666%",

  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",

  auto: "auto",
  fit: "fit-content",
  full: "100%",
  max: "max-content",
  min: "min-content",
} as const;
