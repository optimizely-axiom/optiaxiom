import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { layers } from "../layers";
import { conditions } from "../utils";
import { recipe } from "../vanilla-extract";

export const base = recipe({
  base: {
    borderColor: "border.secondary",
  },
});

const props = defineProperties({
  "@layer": layers.components,
  ...conditions,
  properties: {
    orientation: {
      horizontal: {
        borderLeftWidth: "0",
        borderTopWidth: "1px",
        width: "auto",
      },
      vertical: {
        alignSelf: "stretch",
        borderLeftWidth: "1px",
        borderTopWidth: "0",
        height: "auto",
      },
    },
  },
});
export const separator = createSprinkles(props);

export type SeparatorVariants = Parameters<typeof separator>[0];
