import { Button, Flex, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Tooltip content="Sample tooltip content" delayDuration={0}>
        <Button>Delay duration 0ms</Button>
      </Tooltip>

      <Tooltip content="Sample tooltip content">
        <Button>Delay duration 700ms</Button>
      </Tooltip>
    </Flex>
  );
}
