import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box p="48">p=48</Box>
      <Box p="sm">p=sm</Box>
      <Box p="md">p=md</Box>
      <Box p="lg">p=lg</Box>
    </Canvas>
  );
}
