import { Avatar, Flex } from "@optiaxiom/react";
import { IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Avatar colorScheme="blue" icon={<IconUser />} name="Jake Schildt">
        PQ
      </Avatar>
      <Avatar colorScheme="blue" name="Keiron Pollard">
        MQ
      </Avatar>
      <Avatar colorScheme="blue">JL</Avatar>
    </Flex>
  );
}
