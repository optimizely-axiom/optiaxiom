import { Flex, Separator, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row" gap="sm">
      <Text>Item A</Text>
      <Separator orientation="vertical" />
      <Text>Item B</Text>
      <Separator orientation="vertical" />
      <Text>Item C</Text>
    </Flex>
  );
}
