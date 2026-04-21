"use client";

import { IconSidebar } from "@optiaxiom/icons";
import { ToggleButton, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Tooltip content="Toggle sidebar">
      <ToggleButton aria-label="Toggle sidebar" icon={<IconSidebar />} />
    </Tooltip>
  );
}
