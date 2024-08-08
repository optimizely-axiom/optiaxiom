import { GlobalNavBottom as GlobalNavBottomComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const GlobalNavBottom = "ax-global-nav-bottom";
register(GlobalNavBottom, GlobalNavBottomComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [GlobalNavBottom]: ComponentAttributes<typeof GlobalNavBottomComponent>;
    }
  }
}
