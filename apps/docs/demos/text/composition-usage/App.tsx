import { Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Text color="fg.secondary" fontSize="sm">
        Status:{" "}
        <Text asChild color="fg.success.strong" fontWeight="600">
          <span>Active</span>
        </Text>
      </Text>
      <Text color="fg.secondary" fontSize="sm">
        Date format:{" "}
        <Text asChild fontWeight="600">
          <span>YYYY-MM-DD</span>
        </Text>
      </Text>
    </Group>
  );
}
