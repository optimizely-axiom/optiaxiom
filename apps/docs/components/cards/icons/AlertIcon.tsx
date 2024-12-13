import { theme } from "@optiaxiom/globals";
import { Box, Flex } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const AlertIcon = () => (
  <Flex
    alignItems="start"
    bg="bg.warning.subtle"
    flexDirection="row"
    gap="4"
    p="6"
    rounded="sm"
    style={{ boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.2)" }}
    w="56"
  >
    <Box
      p="2"
      rounded="sm"
      style={{ backgroundColor: theme.colors["fg.warning.strong"] }}
    />
    <Flex flex="1" gap="4">
      <IconText w="1/4" />
      <IconText intent="secondary" w="2/3" />
    </Flex>
  </Flex>
);
