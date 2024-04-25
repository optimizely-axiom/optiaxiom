import { Box, Grid } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Grid cols={2} gap="md">
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
        <Box>04</Box>
      </Grid>
    </Canvas>
  );
}
