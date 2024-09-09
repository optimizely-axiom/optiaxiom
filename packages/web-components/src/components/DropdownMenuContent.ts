import { DropdownMenuContent as DropdownMenuContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DropdownMenuContent = "ax-dropdown-menu-content";
export default register(DropdownMenuContent, DropdownMenuContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownMenuContent]: ComponentAttributes<
        typeof DropdownMenuContentComponent
      >;
    }
  }
}
