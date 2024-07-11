import { TabsList as TabsListComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "./register";

export const TabsList = "ax-tabs-list";
register(TabsList, TabsListComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TabsList]: ComponentAttributes<typeof TabsListComponent>;
    }
  }
}
