import { Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Text fontSize="xs">Extra small text</Text>
      <Text fontSize="sm">Small text</Text>
      <Text fontSize="md">Default text</Text>
      <Text fontSize="lg">Large text</Text>
      <Text fontSize="xl">Extra large text</Text>
    </Group>
  );
}
