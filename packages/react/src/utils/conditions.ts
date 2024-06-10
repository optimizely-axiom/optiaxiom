import { tokens } from "../tokens";
import { mapValues } from "./mapValues";

export const conditions = {
  conditions: {
    ...mapValues(tokens.screens, (width) => ({
      "@media": `screen and (min-width: ${width})`,
    })),
    base: {},
  },
  defaultCondition: "base",
  responsiveArray: ["base", "sm", "md"],
} as const;
