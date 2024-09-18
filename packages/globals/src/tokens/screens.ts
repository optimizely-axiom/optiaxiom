import { rem } from "./rem";

export const screens = {
  sm: rem("600px"),
  md: rem("900px"),
  lg: rem("1200px"),
} as const;
