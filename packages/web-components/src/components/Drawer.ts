import { Drawer as DrawerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Drawer = "ax-drawer";
register(Drawer, DrawerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Drawer]: ComponentAttributes<typeof DrawerComponent>;
    }
  }
}
