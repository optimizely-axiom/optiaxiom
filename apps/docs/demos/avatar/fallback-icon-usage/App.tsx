import { Avatar, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Avatar />
      <Avatar fallback="user" />
      <Avatar fallback="team" />
      <Avatar fallback="opal" />
    </Group>
  );
}
