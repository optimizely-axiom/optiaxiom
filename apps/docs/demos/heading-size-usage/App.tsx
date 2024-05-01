import { Heading } from "@optiaxiom/react";

export function App() {
  return (
    <>
      <Heading variant="h5">This is an h1 heading in h5 size</Heading>
      <Heading level={5} variant="h1">
        This is an h5 heading in h1 size
      </Heading>
      <Heading level={6} variant="h3">
        This is an h6 heading in h3 size
      </Heading>
    </>
  );
}
