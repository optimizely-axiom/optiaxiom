import { Flex, Heading } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Heading asChild level="5">
        <h1>This is an h1 heading in h5 size</h1>
      </Heading>
      <Heading asChild>
        <h5>This is an h5 heading in h1 size</h5>
      </Heading>
      <Heading asChild level="3">
        <h6>This is an h6 heading in h3 size</h6>
      </Heading>
    </Flex>
  );
}
