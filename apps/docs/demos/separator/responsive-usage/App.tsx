import { Flex, Separator, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection={["column", "row"]} gap="sm">
      <Text>This is item A</Text>
      <Separator orientation={["horizontal", "vertical"]} />
      <Text>This is item B</Text>
      <Separator orientation={["horizontal", "vertical"]} />
      <Text>This is item C</Text>
    </Flex>
  );
}
