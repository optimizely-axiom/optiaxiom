import { Box, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Stack flexDirection="row">
      <Box background="bg.information" padding="sm">
        Box 1
      </Box>

      <Box background="bg.information" padding="lg">
        Box 2
      </Box>

      <Box background="bg.information" padding="sm">
        Box 3
      </Box>
    </Stack>
  );
}
