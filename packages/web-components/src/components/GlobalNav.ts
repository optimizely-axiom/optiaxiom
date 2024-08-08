import { GlobalNav as GlobalNavComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const GlobalNav = "ax-global-nav";
register(GlobalNav, GlobalNavComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [GlobalNav]: ComponentAttributes<typeof GlobalNavComponent>;
    }
  }
}
