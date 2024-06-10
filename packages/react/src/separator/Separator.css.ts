import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

import { theme } from "../styles";
import { conditions } from "../utils";
import { style } from "../vanilla-extract";

export const base = style({
  backgroundColor: theme.colors["border.default"],
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
