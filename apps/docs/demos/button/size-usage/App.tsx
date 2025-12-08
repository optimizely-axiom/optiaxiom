import { Button, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Group gap="16">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Group>
      <Group gap="16">
        <Button appearance="primary" size="sm">
          Small
        </Button>
        <Button appearance="primary" size="md">
          Medium
        </Button>
        <Button appearance="primary" size="lg">
          Large
        </Button>
      </Group>
    </Group>
  );
}
