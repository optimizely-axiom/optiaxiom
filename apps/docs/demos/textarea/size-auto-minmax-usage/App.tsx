import { Group, Textarea } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16" maxW="xs" w="full">
      <Textarea
        maxRows={3}
        placeholder="Enter text..."
        resize="auto"
        rows={1}
      />
    </Group>
  );
}
