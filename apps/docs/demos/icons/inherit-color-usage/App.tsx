import { IconCircleExclamation } from "@optiaxiom/icons";
import { Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group color="fg.error" gap="4">
      <IconCircleExclamation />
      Upload failed
    </Group>
  );
}
