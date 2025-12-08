import { Group } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const MenuIcon = () => (
  <Group alignItems="start" flexDirection="column" gap="2">
    <IconButton intent="secondary" pt="6" px="12" />
    <Group
      bg="bg.default"
      border="1"
      borderColor="border.secondary"
      flexDirection="column"
      gap="4"
      p="4"
      rounded="sm"
      shadow="sm"
      w="xl"
    >
      <Group
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        gap="4"
        p="2"
        px="4"
        rounded="sm"
      >
        <IconText style={{ padding: "3px 1px" }} />
      </Group>
      <Group gap="4">
        <IconText intent="secondary" w="2/3" />
        <IconText intent="secondary" ml="auto" p="2" rounded="sm" />
      </Group>
      <IconText intent="secondary" w="2/3" />
      <IconText intent="secondary" w="1/2" />
    </Group>
  </Group>
);
