import { Box, Flex, Separator, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Box>
      <Text fontWeight="600">Axiom</Text>
      <Text>Optimizely Design System</Text>
      <Separator />
      <Flex flexDirection="row" gap="0">
        <Text>Getting Started</Text>
        <Separator orientation="vertical" />
        <Text>Styled System</Text>
        <Separator orientation="vertical" />
        <Text>Components</Text>
      </Flex>
    </Box>
  );
}
