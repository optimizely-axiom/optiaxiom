import { TabsContent as TabsContentComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const TabsContent = "ax-tabs-content";
export default register(TabsContent, TabsContentComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TabsContent]: ComponentAttributes<typeof TabsContentComponent>;
    }
  }
}
