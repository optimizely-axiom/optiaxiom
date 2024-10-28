import { Flex, Spinner } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Flex>
  );
}
