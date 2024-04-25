import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box padding={6}>padding=6</Box>
      <Box padding="sm">padding=sm</Box>
      <Box padding="md">padding=md</Box>
      <Box padding="lg">padding=lg</Box>
    </Canvas>
  );
}
