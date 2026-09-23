import { Group } from "@optiaxiom/react";

import { IconBox } from "./IconBox";

export const SidebarIcon = () => (
  <Group gap="4" justifyContent="stretch" w="56">
    <IconBox bg="bg.accent.light" flex="none" p="10" />

    <IconBox bg="bg.success.light" flex="1" />
  </Group>
);
