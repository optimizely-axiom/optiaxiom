import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection={["column", "row"]}>
      <Box bg="bg.success.subtle" color="fg.success.strong" p="16">
        Item 1
      </Box>
      <Box bg="bg.success.subtle" color="fg.success.strong" p="16">
        Item 2
      </Box>
    </Flex>
  );
}
