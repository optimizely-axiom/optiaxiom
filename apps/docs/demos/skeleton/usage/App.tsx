import { Flex, Skeleton } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Skeleton />
      <Skeleton h="80" />
      <Skeleton circle h="64" />
    </Flex>
  );
}
