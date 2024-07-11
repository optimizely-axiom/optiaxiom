import { Chip as ChipComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Chip = "ax-chip";
register(Chip, ChipComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Chip]: ComponentAttributes<typeof ChipComponent>;
    }
  }
}
