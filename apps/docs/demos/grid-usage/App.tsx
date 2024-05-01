import { Box, Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Grid cols="2">
      <Box bg="bg.information" p="md">
        Box 1
      </Box>

      <Box bg="bg.information" p="md">
        Box 2
      </Box>

      <Box bg="bg.information" p="md">
        Box 3
      </Box>
    </Grid>
  );
}
