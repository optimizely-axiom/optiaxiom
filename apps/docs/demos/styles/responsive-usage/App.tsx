import { Box, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection={["column", "row"]} gap="16">
      <Box bg="bg.success.subtle" color="fg.success.strong" p="16">
        Item 1
      </Box>
      <Box bg="bg.success.subtle" color="fg.success.strong" p="16">
        Item 2
      </Box>
    </Group>
  );
}
