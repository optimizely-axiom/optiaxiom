import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { conditions } from "../utils";
import { recipe } from "../vanilla-extract";

export const base = recipe({
  base: {
    bg: "border.default",
  },
});

const props = defineProperties({
  ...conditions,
  properties: {
    orientation: {
      horizontal: { height: "1px", width: "auto" },
      vertical: { alignSelf: "stretch", height: "auto", width: "1px" },
    },
  },
});
export const separator = createSprinkles(props);

export type SeparatorVariants = Parameters<typeof separator>[0];
