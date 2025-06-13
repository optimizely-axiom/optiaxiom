import { Avatar, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Avatar />
      <Avatar fallback="user" />
      <Avatar fallback="team" />
      <Avatar fallback="opal" />
    </Flex>
  );
}
