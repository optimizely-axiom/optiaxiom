import { theme } from "@optiaxiom/globals";
import { style as veStyle } from "@vanilla-extract/css";

import { layers } from "../layers";
import { recipe } from "../vanilla-extract";

export const icon = recipe({
  base: [
    {
      flex: "none",
    },
    veStyle({
      "@layer": {
        [layers.theme + ".icons"]: {
          height: theme.size["2xs"],
          width: "auto",
        },
      },
    }),
  ],
});
