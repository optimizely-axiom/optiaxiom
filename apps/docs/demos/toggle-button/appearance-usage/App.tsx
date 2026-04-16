import { IconDockToRight } from "@optiaxiom/icons";
import { Group, ToggleButton } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <ToggleButton
        appearance="subtle"
        aria-label="Toggle sidebar"
        icon={<IconDockToRight />}
      />
      <ToggleButton aria-label="Toggle sidebar" icon={<IconDockToRight />} />
    </Group>
  );
}
