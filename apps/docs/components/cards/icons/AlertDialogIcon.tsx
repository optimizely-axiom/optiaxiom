import { Box, Group, type GroupProps } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const AlertDialogIcon = (props: GroupProps) => (
  <Group
    bg="bg.default"
    border="1"
    borderColor="border.secondary"
    flexDirection="column"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
    {...props}
  >
    <Group gap="4">
      <Box bg="bg.error" p="2" rounded="sm" />
      <IconText w="1/2" />
    </Group>
    <IconText intent="secondary" w="full" />
    <IconText intent="secondary" w="2/3" />
    <Box p="2" />
    <Group gap="4">
      <IconButton intent="secondary" ml="auto" />
      <IconButton intent="danger" />
    </Group>
  </Group>
);
