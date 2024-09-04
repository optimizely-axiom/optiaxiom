import { Flex, Heading } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Heading appearance="h5">This is an h1 heading in h5 size</Heading>
      <Heading appearance="h1" level="5">
        This is an h5 heading in h1 size
      </Heading>
      <Heading appearance="h3" level="6">
        This is an h6 heading in h3 size
      </Heading>
    </Flex>
  );
}
