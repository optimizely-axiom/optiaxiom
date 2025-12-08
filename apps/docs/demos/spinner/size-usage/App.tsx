import { Group, Spinner } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Group>
  );
}
