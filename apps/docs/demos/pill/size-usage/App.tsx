import { Flex } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Flex flexDirection="row">
      <Pill size="xs">Extra Small</Pill>
      <Pill>Small</Pill>
    </Flex>
  );
}
