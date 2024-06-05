import { rem } from "./rem";
import { spacing } from "./spacing";

export const margins = {
  ...spacing,

  "-xs": rem("-8px"),
  "-sm": rem("-12px"),
  "-md": rem("-16px"),
  "-lg": rem("-24px"),
  "-xl": rem("-32px"),

  "-2": rem("-2px"),
  "-4": rem("-4px"),
  "-6": rem("-6px"),
  "-8": rem("-8px"),
  "-10": rem("-10px"),
  "-12": rem("-12px"),
  "-16": rem("-16px"),
  "-24": rem("-24px"),
  "-32": rem("-32px"),
  "-48": rem("-48px"),
  "-64": rem("-64px"),
  "-80": rem("-80px"),
} as const;
