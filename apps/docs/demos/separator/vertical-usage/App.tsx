import { Group, Separator, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="12">
      <Text>Item A</Text>
      <Separator orientation="vertical" />
      <Text>Item B</Text>
      <Separator orientation="vertical" />
      <Text>Item C</Text>
    </Group>
  );
}
