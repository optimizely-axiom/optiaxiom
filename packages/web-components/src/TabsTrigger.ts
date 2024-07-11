import { TabsTrigger as TabsTriggerComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const TabsTrigger = "ax-tabs-trigger";
register(TabsTrigger, TabsTriggerComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TabsTrigger]: ComponentAttributes<typeof TabsTriggerComponent>;
    }
  }
}
