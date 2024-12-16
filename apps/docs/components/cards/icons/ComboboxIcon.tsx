import { Flex } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const ComboboxIcon = () => (
  <Flex alignItems="start" gap="2">
    <IconButton intent="secondary" pt="6" px="12" />
    <Flex
      bg="bg.default"
      border="1"
      gap="4"
      p="4"
      rounded="sm"
      shadow="sm"
      w="xl"
    >
      <Flex
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        flexDirection="row"
        gap="4"
        p="2"
        px="4"
        rounded="sm"
      >
        <IconText style={{ padding: "3px 1px" }} />
      </Flex>
      <Flex flexDirection="row" gap="4">
        <IconText intent="secondary" w="2/3" />
        <IconText intent="secondary" ml="auto" p="2" rounded="sm" />
      </Flex>
      <IconText intent="secondary" w="2/3" />
      <IconText intent="secondary" w="1/2" />
    </Flex>
  </Flex>
);
