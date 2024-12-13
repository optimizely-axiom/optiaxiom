import { Box, Flex } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const AlertDialogIcon = () => (
  <Flex bg="bg.default" border="1" gap="4" p="6" rounded="sm" w="56">
    <Flex flexDirection="row" gap="4">
      <Box bg="bg.error" p="2" rounded="sm" />
      <IconText w="1/2" />
    </Flex>
    <IconText intent="secondary" w="full" />
    <IconText intent="secondary" w="2/3" />
    <Box p="2" />
    <Flex flexDirection="row" gap="4">
      <IconButton intent="secondary" ml="auto" />
      <IconButton intent="danger" />
    </Flex>
  </Flex>
);
