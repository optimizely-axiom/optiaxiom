import { Flex } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const AutocompleteIcon = () => (
  <Flex gap="2">
    <Flex
      bg="bg.default"
      border="1"
      borderColor="border.accent"
      flexDirection="row"
      gap="4"
      p="2"
      px="4"
      rounded="sm"
      w="xl"
    >
      <IconText style={{ padding: "4px 1px" }} />
    </Flex>
    <Flex
      bg="bg.default"
      border="1"
      gap="4"
      p="6"
      rounded="sm"
      shadow="sm"
      w="xl"
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
