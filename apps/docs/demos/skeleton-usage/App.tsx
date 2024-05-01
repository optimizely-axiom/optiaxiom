import { Skeleton, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Stack>
      <Skeleton />
      <Skeleton h="80" />
      <Skeleton rounded="full" size="64" />
    </Stack>
  );
}
