import { Badge, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Badge>Status</Badge>

      <Badge colorScheme="danger">99+</Badge>
    </Flex>
  );
}
