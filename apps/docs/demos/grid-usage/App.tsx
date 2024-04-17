import { Box, Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Grid cols={2}>
      <Box background="bg.information" padding="md">
        Box 1
      </Box>

      <Box background="bg.information" padding="md">
        Box 2
      </Box>

      <Box background="bg.information" padding="md">
        Box 3
      </Box>
    </Grid>
  );
}
