import { Box, Grid } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Grid gridTemplateColumns="3">
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
        <Box colSpan="2">04</Box>
        <Box>05</Box>
        <Box>06</Box>
        <Box colSpan="2">07</Box>
      </Grid>
    </Canvas>
  );
}
