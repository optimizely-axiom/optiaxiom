import { Box, Flex, Heading, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex border="1" gap="8" h="224" p="16" rounded="md" w="224">
      <Heading level="4">Assets</Heading>
      <Flex flex="1" minH="0">
        <Box aria-label="Assets" overflow="auto" role="region" tabIndex={0}>
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i} py="4">
              Asset {i + 1}
            </Text>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
}
