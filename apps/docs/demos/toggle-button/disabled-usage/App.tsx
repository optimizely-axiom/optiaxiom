import { ToggleButton, Tooltip } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export function App() {
  return (
    <Tooltip content="Disabled toggle demo">
      <ToggleButton
        aria-label="Toggle sidebar"
        disabled
        icon={<IconLayoutSidebar />}
      />
    </Tooltip>
  );
}
