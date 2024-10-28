import { Avatar, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row" flexWrap="wrap">
      <Avatar>KP</Avatar> {/* Neutral is default */}
      <Avatar colorScheme="purple">KP</Avatar>
    </Flex>
  );
}
