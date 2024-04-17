import {
  createMapValueFn,
  createSprinkles,
  defineProperties,
} from "@vanilla-extract/sprinkles";

import { layers, theme, tokens } from "../styles";
import { mapValues } from "../utils";

const responsiveProperties = defineProperties({
  "@layer": layers.axiom,
  conditions: {
    ...mapValues(tokens.breakpoint, (width) => ({
      "@media": `screen and (min-width: ${width})`,
    })),
    base: {},
  },
  defaultCondition: "base",
  properties: {
    alignItems: [
      "center",
      "end",
      "normal",
      "space-around",
      "space-between",
      "space-evenly",
      "start",
      "stretch",
    ] as const,
    flexDirection: {
      column: "column",
      horizontal: "row",
      row: "row",
      vertical: "column",
    },
    flexWrap: {
      wrap: "wrap",
    },
    gap: theme.space,
    justifyContent: [
      "center",
      "end",
      "normal",
      "space-around",
      "space-between",
      "space-evenly",
      "start",
      "stretch",
    ] as const,
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
export const mapValue = createMapValueFn(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
