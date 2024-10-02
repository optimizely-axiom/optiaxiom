import type { ComponentPropsWithRef } from "react";

import { ToggleButton } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export function App({
  size = "md",
}: Pick<ComponentPropsWithRef<typeof ToggleButton>, "size">) {
  return (
    <ToggleButton
      aria-label="Toggle sidebar"
      icon={<IconLayoutSidebar />}
      size={size}
    />
  );
}
