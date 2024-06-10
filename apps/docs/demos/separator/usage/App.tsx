import { Box, Flex, Separator, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Box>
      <Text fontWeight="600">Axiom</Text>
      <Text>Optimizely Design System</Text>
      <Separator my="sm" />
      <Flex flexDirection="row" gap="sm">
        <Text>Installation</Text>
        <Separator orientation="vertical" />
        <Text>Design</Text>
        <Separator orientation="vertical" />
        <Text>Components</Text>
      </Flex>
    </Box>
  );
}
