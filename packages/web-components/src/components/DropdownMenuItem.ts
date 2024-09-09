import { DropdownMenuItem as DropdownMenuItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DropdownMenuItem = "ax-dropdown-menu-item";
export default register(DropdownMenuItem, DropdownMenuItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownMenuItem]: ComponentAttributes<typeof DropdownMenuItemComponent>;
    }
  }
}
