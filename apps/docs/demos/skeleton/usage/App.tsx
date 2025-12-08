import { Group, Skeleton } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16" w="full">
      <Skeleton />
      <Skeleton h="56" />
      <Skeleton circle size="56" />
    </Group>
  );
}
