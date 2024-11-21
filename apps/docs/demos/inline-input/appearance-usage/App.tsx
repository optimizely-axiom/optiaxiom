import { Heading } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Heading
      asChild
      bg="bg.secondary"
      color="fg.default"
      level="5"
      px="sm"
      py="xs"
      rounded="md"
      w="240"
    >
      <InlineInput label="Task title" />
    </Heading>
  );
}
