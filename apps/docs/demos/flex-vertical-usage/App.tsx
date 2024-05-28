import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="vertical">
      <Box bg="bg.information" p="sm">
        Box 1
      </Box>

      <Box bg="bg.information" p="sm">
        Box 2
      </Box>

      <Box bg="bg.information" p="sm">
        Box 3
      </Box>
    </Flex>
  );
}
