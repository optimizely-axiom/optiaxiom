import { Avatar, Flex } from "@optiaxiom/react";
import { IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Avatar color="blue" icon={<IconUser />} name="Jake Schildt">
        PQ
      </Avatar>
      <Avatar color="blue" name="Keiron Pollard">
        MQ
      </Avatar>
      <Avatar color="blue">JL</Avatar>
    </Flex>
  );
}
