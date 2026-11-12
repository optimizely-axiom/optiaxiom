import { IconSidebar } from "@optiaxiom/icons";
import { Group, Text, ToggleButton } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="8">
      <ToggleButton
        aria-label="Toggle sidebar"
        disabled
        icon={<IconSidebar />}
      />
      <Text color="fg.secondary" fontSize="sm">
        The sidebar is unavailable in full screen mode.
      </Text>
    </Group>
  );
}
