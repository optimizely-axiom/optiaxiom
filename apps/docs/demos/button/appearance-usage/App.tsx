import { Button, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Button appearance="primary">Delete</Button>
      <Button appearance="danger">Delete</Button>
      <Button appearance="danger-outline">Delete</Button>
      <Button appearance="default">Delete</Button>
      <Button appearance="subtle">Delete</Button>
    </Flex>
  );
}
