import { theme } from "@optiaxiom/globals";
import { Box, Flex } from "@optiaxiom/react";

export const ToastIcon = () => (
  <Flex
    bg="bg.default.inverse"
    flexDirection="row"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
  >
    <Box
      p="2"
      rounded="sm"
      style={{ backgroundColor: theme.colors["fg.warning.light"] }}
    />
    <Box bg="bg.page" p="2" rounded="sm" w="1/2" />
  </Flex>
);
