import { DropdownItem as DropdownItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const DropdownItem = "ax-dropdown-item";
register(DropdownItem, DropdownItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownItem]: ComponentAttributes<typeof DropdownItemComponent>;
    }
  }
}
