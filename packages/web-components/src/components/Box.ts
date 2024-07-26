import { Box as BoxComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Box = "ax-box";
register(Box, BoxComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Box]: ComponentAttributes<typeof BoxComponent>;
    }
  }
}
