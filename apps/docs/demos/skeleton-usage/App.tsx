import { Skeleton, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Stack>
      <Skeleton />
      <Skeleton height="10" />
      <Skeleton borderRadius="full" size="8" />
    </Stack>
  );
}
