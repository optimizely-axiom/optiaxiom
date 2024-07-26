import { Switch as SwitchComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Switch = "ax-switch";
register(Switch, SwitchComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Switch]: ComponentAttributes<typeof SwitchComponent>;
    }
  }
}
