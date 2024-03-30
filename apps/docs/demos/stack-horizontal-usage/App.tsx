import { Box, Stack } from "@optimizely-axiom/react";

export function App() {
  return (
    <Stack direction="row">
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
