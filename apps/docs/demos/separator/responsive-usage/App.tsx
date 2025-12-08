import { Group, Separator, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection={["column", "row"]} gap="12">
      <Text>This is item A</Text>
      <Separator orientation={["horizontal", "vertical"]} />
      <Text>This is item B</Text>
      <Separator orientation={["horizontal", "vertical"]} />
      <Text>This is item C</Text>
    </Group>
  );
}
