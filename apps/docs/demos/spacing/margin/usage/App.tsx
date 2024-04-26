import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box margin="0.5">margin=0.5</Box>
      <Box margin="sm">margin=sm</Box>
      <Box margin="md">margin=md</Box>
      <Box margin="lg">margin=lg</Box>
    </Canvas>
  );
}
