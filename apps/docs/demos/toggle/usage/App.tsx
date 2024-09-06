import type { ComponentPropsWithRef } from "react";

import { Toggle } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export function App({
  size = "md",
}: Pick<ComponentPropsWithRef<typeof Toggle>, "size">) {
  return (
    <Toggle
      aria-label="Toggle sidebar"
      icon={<IconLayoutSidebar />}
      size={size}
    />
  );
}
