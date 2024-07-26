import { Tooltip as TooltipComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Tooltip = "ax-tooltip";
register(Tooltip, TooltipComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Tooltip]: ComponentAttributes<typeof TooltipComponent>;
    }
  }
}
