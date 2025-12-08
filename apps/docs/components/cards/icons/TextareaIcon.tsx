import { Box, Group } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const TextareaIcon = () => (
  <Group
    bg="bg.default"
    border="1"
    borderColor="border.accent"
    flexDirection="column"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
  >
    <IconText intent="secondary" w="2/3" />
    <Box p="2" />
    <Box p="2" />
  </Group>
);
