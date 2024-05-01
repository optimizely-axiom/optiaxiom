import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box p="6">p=6</Box>
      <Box p="sm">p=sm</Box>
      <Box p="md">p=md</Box>
      <Box p="lg">p=lg</Box>
    </Canvas>
  );
}
