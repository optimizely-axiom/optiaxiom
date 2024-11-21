import { Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Text asChild color="fg.default" w="240">
      <InlineInput label="Task title" />
    </Text>
  );
}