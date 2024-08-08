import { GlobalNavItem as GlobalNavItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const GlobalNavItem = "ax-global-nav-item";
register(GlobalNavItem, GlobalNavItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [GlobalNavItem]: ComponentAttributes<typeof GlobalNavItemComponent>;
    }
  }
}
