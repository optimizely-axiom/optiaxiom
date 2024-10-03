import { Button, Flex, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
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
    </Flex>
  );
}
