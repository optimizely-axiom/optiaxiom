import { IconSidebar } from "@optiaxiom/icons";
import { ToggleButton, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Tooltip content="Disabled toggle demo">
      <ToggleButton
        aria-label="Toggle sidebar"
        disabled
        icon={<IconSidebar />}
      />
    </Tooltip>
  );
}
