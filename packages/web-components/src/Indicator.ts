import { Indicator as IndicatorComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Indicator = "ax-indicator";
register(Indicator, IndicatorComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Indicator]: ComponentAttributes<typeof IndicatorComponent>;
    }
  }
}
