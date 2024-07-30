import { PopoverTrigger as PopoverTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const PopoverTrigger = "ax-popover-trigger";
register(PopoverTrigger, PopoverTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [PopoverTrigger]: ComponentAttributes<typeof PopoverTriggerComponent>;
    }
  }
}
