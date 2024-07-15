import { MenuItem as MenuItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const MenuItem = "ax-dropdown-item";
register(MenuItem, MenuItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [MenuItem]: ComponentAttributes<typeof MenuItemComponent>;
    }
  }
}
