import { Box, Flex } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const TextareaIcon = () => (
  <Flex
    bg="bg.default"
    border="1"
    borderColor="border.accent"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
  >
    <IconText intent="secondary" w="2/3" />
    <Box p="2" />
    <Box p="2" />
  </Flex>
);
