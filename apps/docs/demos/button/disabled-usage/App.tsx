import { Button, Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group alignItems="start" flexDirection="column" gap="8">
      <Group gap="16">
        <Button appearance="primary" disabled>
          Publish
        </Button>
        <Button disabled>Duplicate</Button>
        <Button appearance="subtle" disabled>
          Archive
        </Button>
      </Group>
      <Text color="fg.secondary" fontSize="sm">
        Select an article to publish, duplicate or archive it.
      </Text>
    </Group>
  );
}
