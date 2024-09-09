import { DropdownMenuLabel as DropdownMenuLabelComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DropdownMenuLabel = "ax-dropdown-menu-label";
export default register(DropdownMenuLabel, DropdownMenuLabelComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DropdownMenuLabel]: ComponentAttributes<
        typeof DropdownMenuLabelComponent
      >;
    }
  }
}
