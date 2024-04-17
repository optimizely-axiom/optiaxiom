import { createVar } from "@vanilla-extract/css";
import {
  createMapValueFn,
  createSprinkles,
  defineProperties,
} from "@vanilla-extract/sprinkles";

import { layers, theme, tokens } from "../styles";
import { mapValues } from "../utils";

const cols = createVar();

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
    cols: {
      1: { vars: { [cols]: 1 } },
      2: { vars: { [cols]: 2 } },
      3: { vars: { [cols]: 3 } },
      4: { vars: { [cols]: 4 } },
    },
    gap: theme.space,
    gridTemplateColumns: {
      cols: {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      },
    },
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
