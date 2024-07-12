import { Badge as BadgeComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const Badge = "ax-badge";
register(Badge, BadgeComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Badge]: ComponentAttributes<typeof BadgeComponent>;
    }
  }
}
