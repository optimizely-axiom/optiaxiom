import { DropdownContent as DropdownContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const DropdownContent = "ax-dropdown-content";
register(DropdownContent, DropdownContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownContent]: ComponentAttributes<typeof DropdownContentComponent>;
    }
  }
}
