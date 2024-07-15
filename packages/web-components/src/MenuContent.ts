import { MenuContent as MenuContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const MenuContent = "ax-dropdown-content";
register(MenuContent, MenuContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [MenuContent]: ComponentAttributes<typeof MenuContentComponent>;
    }
  }
}
