import { Button, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Flex flexDirection="row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Flex>

      <Flex flexDirection="row">
        <Button appearance="primary" size="sm">
          Small
        </Button>
        <Button appearance="primary" size="md">
          Medium
        </Button>
        <Button appearance="primary" size="lg">
          Large
        </Button>
      </Flex>
    </Flex>
  );
}
