import { Avatar, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex display="flex" flexDirection="row" gap="10">
      {/* Neutral is default */}
      <Avatar>KP</Avatar>
      <Avatar color="red">KP</Avatar>
      <Avatar color="blue">KP</Avatar>
      <Avatar color="green">KP</Avatar>
      <Avatar color="yellow">KP</Avatar>
      <Avatar color="orange">KP</Avatar>
      <Avatar color="magenta">KP</Avatar>
      <Avatar color="gray">KP</Avatar>
      <Avatar color="slate">KP</Avatar>
      <Avatar color="purple">KP</Avatar>
      <Avatar color="brand">KP</Avatar>
      <Avatar color="dark">KP</Avatar>
    </Flex>
  );
}
