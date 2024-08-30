import { DrawerFooter as DrawerFooterComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DrawerFooter = "ax-drawer-footer";
export default register(DrawerFooter, DrawerFooterComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DrawerFooter]: ComponentAttributes<typeof DrawerFooterComponent>;
    }
  }
}
