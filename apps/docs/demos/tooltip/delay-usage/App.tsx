import { Button, Group, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Tooltip content="Sample tooltip content" delayDuration={0}>
        <Button>Delay duration 0ms</Button>
      </Tooltip>
      <Tooltip content="Sample tooltip content">
        <Button>Delay duration 700ms</Button>
      </Tooltip>
    </Group>
  );
}
