import { Avatar, Flex } from "@optiaxiom/react";
import { IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection="row" gap="10">
      <Avatar icon={<IconUser color="blue" />} name="Jake Schildt">
        PQ
      </Avatar>
      <Avatar name="Keiron Pollard">MQ</Avatar>
      <Avatar>JL</Avatar>
    </Flex>
  );
}
