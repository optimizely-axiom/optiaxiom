import { Box, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Stack flexDirection="row">
      <Box bg="bg.information" p="sm">
        Box 1
      </Box>

      <Box bg="bg.information" p="lg">
        Box 2
      </Box>

      <Box bg="bg.information" p="sm">
        Box 3
      </Box>
    </Stack>
  );
}
