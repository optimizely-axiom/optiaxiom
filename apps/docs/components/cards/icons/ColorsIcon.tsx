import { Group } from "@optiaxiom/react";

import { IconBox } from "./IconBox";

export const ColorsIcon = () => (
  <Group gap="4" w="xl">
    <IconBox bg="bg.information" flex="1" h="lg" />
    <IconBox bg="bg.success" flex="1" h="lg" />
    <IconBox bg="bg.warning" flex="1" h="lg" />
  </Group>
);
