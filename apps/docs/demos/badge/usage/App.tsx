import { Badge, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Badge>Status</Badge>
      <Badge intent="danger">99+</Badge>
    </Group>
  );
}
