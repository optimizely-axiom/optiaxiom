import { Pill as PillComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Pill = "ax-pill";
register(Pill, PillComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Pill]: ComponentAttributes<typeof PillComponent>;
    }
  }
}
