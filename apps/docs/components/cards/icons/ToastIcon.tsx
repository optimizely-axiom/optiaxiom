import { Box, Group, theme } from "@optiaxiom/react";

export const ToastIcon = () => (
  <Group bg="bg.default.inverse" gap="4" p="6" rounded="sm" w="56">
    <Box
      p="2"
      rounded="sm"
      style={{ backgroundColor: theme.colors["fg.warning.light"] }}
    />
    <Box bg="bg.page" p="2" rounded="sm" w="1/2" />
  </Group>
);
