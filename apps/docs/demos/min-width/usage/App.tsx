import { Avatar, Box, Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="8" w="224">
      <Avatar name="Ada Lovelace" />
      <Box minW="0">
        <Text truncate>Mathematician and the first computer programmer</Text>
      </Box>
    </Group>
  );
}
