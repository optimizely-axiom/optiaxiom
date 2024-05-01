import { Skeleton, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Stack>
      <Skeleton />
      <Skeleton h="10" />
      <Skeleton rounded="full" size="8" />
    </Stack>
  );
}
