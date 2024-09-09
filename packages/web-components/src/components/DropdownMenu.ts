import { DropdownMenu as DropdownMenuComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DropdownMenu = "ax-dropdown-menu";
export default register(DropdownMenu, DropdownMenuComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownMenu]: ComponentAttributes<typeof DropdownMenuComponent>;
    }
  }
}
