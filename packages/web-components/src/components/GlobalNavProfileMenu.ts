import { GlobalNavProfileMenu as GlobalNavProfileMenuComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const GlobalNavProfileMenu = "ax-global-nav-profile-menu";
register(GlobalNavProfileMenu, GlobalNavProfileMenuComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [GlobalNavProfileMenu]: ComponentAttributes<
        typeof GlobalNavProfileMenuComponent
      >;
    }
  }
}
