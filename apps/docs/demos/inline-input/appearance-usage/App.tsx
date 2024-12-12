import { Heading } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Heading
      asChild
      bg="bg.secondary"
      color="fg.default"
      level="5"
      px="12"
      py="8"
      rounded="md"
      w="224"
    >
      <InlineInput label="Task title" />
    </Heading>
  );
}
