import { Canvas } from "@/demos/Canvas";
import { Box, Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Grid gridTemplateColumns="3">
        <Box gridColumn={["3", "2"]}>01</Box>
        <div>02</div>
        <div>03</div>
        <Box gridColumn={["1", "2"]}>04</Box>
      </Grid>
    </Canvas>
  );
}
