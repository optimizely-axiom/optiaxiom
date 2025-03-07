import { Canvas } from "@/demos/Canvas";
import { Box, Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Grid gap="24" gridTemplateColumns="2">
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
        <Box>04</Box>
      </Grid>
    </Canvas>
  );
}
