import { AnimatePresence as AnimatePresenceComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const AnimatePresence = "ax-animate-presence";
register(AnimatePresence, AnimatePresenceComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [AnimatePresence]: ComponentAttributes<typeof AnimatePresenceComponent>;
    }
  }
}
