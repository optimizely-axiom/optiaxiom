import { Box, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      bg="bg.warning.light"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      px={["16", "64"]}
      py="16"
      rounded="sm"
    >
      <Text bg="bg.default.pressed" p="4" rounded="inherit">
        px=[16, 64]
      </Text>
    </Box>
  );
}
