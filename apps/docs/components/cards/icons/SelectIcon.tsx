import { Group } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const SelectIcon = () => (
  <Group alignItems="start" flexDirection="column" gap="2">
    <IconButton intent="secondary" pl="20" pr="4">
      <IconText intent="secondary" p="2" rounded="sm" />
    </IconButton>
    <Group
      bg="bg.default"
      border="1"
      borderColor="border.secondary"
      flexDirection="column"
      gap="4"
      p="6"
      rounded="sm"
      shadow="sm"
      w="lg"
    >
      <Group gap="4">
        <IconText intent="secondary" w="2/3" />
        <IconText intent="secondary" ml="auto" p="2" rounded="sm" />
      </Group>
      <IconText intent="secondary" w="2/3" />
      <IconText intent="secondary" w="1/2" />
    </Group>
  </Group>
);
