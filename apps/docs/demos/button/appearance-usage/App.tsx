import { Button, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection={["column", "row"]} gap="16">
      <Button appearance="primary">Delete</Button>
      <Button appearance="danger">Delete</Button>
      <Button appearance="danger-outline">Delete</Button>
      <Button appearance="default">Delete</Button>
      <Button appearance="subtle">Delete</Button>
    </Group>
  );
}
