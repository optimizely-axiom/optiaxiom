import { Tabs as TabsComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Tabs = "ax-tabs";
export default register(Tabs, TabsComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Tabs]: ComponentAttributes<typeof TabsComponent>;
    }
  }
}
