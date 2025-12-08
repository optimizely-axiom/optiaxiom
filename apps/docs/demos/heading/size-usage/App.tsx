import { Group, Heading } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Heading asChild level="4">
        <h1>This is an h1 heading in h4 size</h1>
      </Heading>
      <Heading asChild>
        <h5>This is an h5 heading in h1 size</h5>
      </Heading>
      <Heading asChild level="3">
        <h6>This is an h6 heading in h3 size</h6>
      </Heading>
    </Group>
  );
}
