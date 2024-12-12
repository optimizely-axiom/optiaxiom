import { Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Text asChild color="fg.default" w="224">
      <InlineInput label="Task title" placeholder="Enter a task title..." />
    </Text>
  );
}
