import { MenuTrigger as MenuTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const MenuTrigger = "ax-menu-trigger";
register(MenuTrigger, MenuTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [MenuTrigger]: ComponentAttributes<typeof MenuTriggerComponent>;
    }
  }
}
