"use client";

import { ToggleButton, Tooltip } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export function App() {
  return (
    <Tooltip content="Toggle sidebar">
      <ToggleButton aria-label="Toggle sidebar" icon={<IconLayoutSidebar />} />
    </Tooltip>
  );
}
