import { Group, Progress } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16" w="1/2">
      <Progress value={25} />
      <Progress intent="success" value={50} />
      <Progress intent="danger" value={75} />
    </Group>
  );
}
