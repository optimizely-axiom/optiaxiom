import { HoverCard as HoverCardComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const HoverCard = "ax-hover-card";
register(HoverCard, HoverCardComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [HoverCard]: ComponentAttributes<typeof HoverCardComponent>;
    }
  }
}
