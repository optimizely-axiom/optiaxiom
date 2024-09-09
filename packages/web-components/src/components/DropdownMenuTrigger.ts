import { DropdownMenuTrigger as MenuTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DropdownMenuTrigger = "ax-menu-trigger";
export default register(DropdownMenuTrigger, MenuTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownMenuTrigger]: ComponentAttributes<typeof MenuTriggerComponent>;
    }
  }
}
