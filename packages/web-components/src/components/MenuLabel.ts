import { MenuLabel as MenuLabelComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const MenuLabel = "ax-menu-label";
register(MenuLabel, MenuLabelComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [MenuLabel]: ComponentAttributes<typeof MenuLabelComponent>;
    }
  }
}
