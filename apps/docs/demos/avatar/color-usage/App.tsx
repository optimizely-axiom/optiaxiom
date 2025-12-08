import { Avatar, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexWrap="wrap" gap="16">
      <Avatar>KP</Avatar> {/* Neutral is default */}
      <Avatar colorScheme="purple">KP</Avatar>
    </Group>
  );
}
