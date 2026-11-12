import { Group, Text } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Group gap="8">
      <Pill disabled>Archived</Pill>
      <Text color="fg.secondary" fontSize="sm">
        Archived articles are read only.
      </Text>
    </Group>
  );
}
