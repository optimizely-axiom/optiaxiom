import { Popover as PopoverComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Popover = "ax-popover";
register(Popover, PopoverComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Popover]: ComponentAttributes<typeof PopoverComponent>;
    }
  }
}
