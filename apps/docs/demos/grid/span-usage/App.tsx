import { Box, Grid } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas asChild>
      <Grid gridTemplateColumns="3">
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <Box gridColumn="2">04</Box>
        <div>05</div>
        <div>06</div>
        <Box gridColumn="2">07</Box>
      </Grid>
    </Canvas>
  );
}
