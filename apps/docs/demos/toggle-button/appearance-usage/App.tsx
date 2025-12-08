import { Group, ToggleButton } from "@optiaxiom/react";
import { IconLayoutSidebar } from "@tabler/icons-react";

export function App() {
  return (
    <Group gap="16">
      <ToggleButton
        appearance="subtle"
        aria-label="Toggle sidebar"
        icon={<IconLayoutSidebar />}
      />
      <ToggleButton aria-label="Toggle sidebar" icon={<IconLayoutSidebar />} />
    </Group>
  );
}
