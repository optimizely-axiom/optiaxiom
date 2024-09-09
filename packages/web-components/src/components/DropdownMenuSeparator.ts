import { DropdownMenuSeparator as DropdownMenuSeparatorComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DropdownMenuSeparator = "ax-dropdown-menu-separator";
export default register(DropdownMenuSeparator, DropdownMenuSeparatorComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownMenuSeparator]: ComponentAttributes<
        typeof DropdownMenuSeparatorComponent
      >;
    }
  }
}
