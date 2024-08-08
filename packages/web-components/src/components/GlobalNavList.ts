import { GlobalNavList as GlobalNavListComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const GlobalNavList = "ax-global-nav-list";
register(GlobalNavList, GlobalNavListComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [GlobalNavList]: ComponentAttributes<typeof GlobalNavListComponent>;
    }
  }
}
