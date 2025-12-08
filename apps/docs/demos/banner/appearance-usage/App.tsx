import { Banner, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Banner intent="neutral">This is an example of a neutral banner.</Banner>
      <Banner intent="information">
        This is an example of an information banner.
      </Banner>
      <Banner intent="success">This is an example of a success banner.</Banner>
      <Banner intent="warning">This is an example of a warning banner.</Banner>
      <Banner intent="danger">This is an example of a danger banner.</Banner>
    </Group>
  );
}
