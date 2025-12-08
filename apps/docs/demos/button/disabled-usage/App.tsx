import { Button, Group, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Tooltip content="Disabled button demo">
        <Button appearance="primary" disabled>
          Disabled
        </Button>
      </Tooltip>
      <Tooltip content="Disabled button demo">
        <Button disabled>Disabled</Button>
      </Tooltip>
      <Tooltip content="Disabled button demo">
        <Button appearance="subtle" disabled>
          Disabled
        </Button>
      </Tooltip>
    </Group>
  );
}
