import { DrawerBody as DrawerBodyComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DrawerBody = "ax-drawer-body";
export default register(DrawerBody, DrawerBodyComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DrawerBody]: ComponentAttributes<typeof DrawerBodyComponent>;
    }
  }
}
