import { DropdownTrigger as DropdownTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const DropdownTrigger = "ax-dropdown-trigger";
register(DropdownTrigger, DropdownTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownTrigger]: ComponentAttributes<typeof DropdownTriggerComponent>;
    }
  }
}
