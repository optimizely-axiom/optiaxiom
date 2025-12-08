import { Group, Textarea } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16" maxW="xs" w="full">
      <Textarea placeholder="Enter text..." resize="auto" />
    </Group>
  );
}
