import { Badge, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Badge>Status</Badge>

      <Badge intent="danger">99+</Badge>
    </Flex>
  );
}
