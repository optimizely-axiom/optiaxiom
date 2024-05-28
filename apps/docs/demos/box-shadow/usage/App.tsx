import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box shadow="sm">shadow=sm</Box>
      <Box shadow="md">shadow=md</Box>
      <Box shadow="lg">shadow=lg</Box>
      <Box shadow="xl">shadow=xl</Box>
    </Canvas>
  );
}
