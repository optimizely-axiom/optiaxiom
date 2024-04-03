import { Box, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Stack direction="vertical">
      <Box background="purple.50" padding="sm">
        Box 1
      </Box>

      <Box background="purple.50" padding="lg">
        Box 2
      </Box>

      <Box background="purple.50" padding="sm">
        Box 3
      </Box>
    </Stack>
  );
}
