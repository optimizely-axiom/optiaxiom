import { DateInput, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <DateInput placeholder="Medium (default)" size="md" />
      <DateInput placeholder="Large" size="lg" />
    </Group>
  );
}
