import { createVar } from "@vanilla-extract/css";
import {
  createMapValueFn,
  createSprinkles,
  defineProperties,
} from "@vanilla-extract/sprinkles";

import { layers, tokens } from "../styles";
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
    cols: {
      1: { vars: { [cols]: 1 } },
      2: { vars: { [cols]: 2 } },
      3: { vars: { [cols]: 3 } },
      4: { vars: { [cols]: 4 } },
    },
    gridTemplateColumns: {
      cols: {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      },
    },
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
export const mapValue = createMapValueFn(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
