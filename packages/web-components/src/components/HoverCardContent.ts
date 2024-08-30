import { HoverCardContent as HoverCardContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const HoverCardContent = "ax-hover-card-content";
export default register(HoverCardContent, HoverCardContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [HoverCardContent]: ComponentAttributes<typeof HoverCardContentComponent>;
    }
  }
}
