import { DateInput, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <DateInput placeholder="Medium (default)" size="md" />
      <DateInput placeholder="Large" size="lg" />
    </Flex>
  );
}
