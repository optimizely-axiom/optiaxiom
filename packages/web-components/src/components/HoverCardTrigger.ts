import { HoverCardTrigger as HoverCardTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const HoverCardTrigger = "ax-hover-card-trigger";
register(HoverCardTrigger, HoverCardTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [HoverCardTrigger]: ComponentAttributes<typeof HoverCardTriggerComponent>;
    }
  }
}
