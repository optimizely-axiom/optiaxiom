import { Dropdown as DropdownComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Dropdown = "ax-dropdown";
register(Dropdown, DropdownComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Dropdown]: ComponentAttributes<typeof DropdownComponent>;
    }
  }
}
