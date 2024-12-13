import { Flex } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const SelectIcon = () => (
  <Flex alignItems="start" gap="2">
    <IconButton intent="secondary" pl="20" pr="4">
      <IconText intent="secondary" p="2" rounded="sm" />
    </IconButton>
    <Flex
      bg="bg.default"
      border="1"
      gap="4"
      p="6"
      rounded="sm"
      shadow="sm"
      w="lg"
    >
      <Flex flexDirection="row" gap="4">
        <IconText intent="secondary" w="2/3" />
        <IconText intent="secondary" ml="auto" p="2" rounded="sm" />
      </Flex>
      <IconText intent="secondary" w="2/3" />
      <IconText intent="secondary" w="1/2" />
    </Flex>
  </Flex>
);
