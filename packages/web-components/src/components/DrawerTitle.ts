import { DrawerTitle as DrawerTitleComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DrawerTitle = "ax-drawer-title";
export default register(DrawerTitle, DrawerTitleComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DrawerTitle]: ComponentAttributes<typeof DrawerTitleComponent>;
    }
  }
}
