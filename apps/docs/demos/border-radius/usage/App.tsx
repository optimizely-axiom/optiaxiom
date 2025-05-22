import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas outside>
      <Box rounded="sm">rounded=sm</Box>
      <Box rounded="md">rounded=md</Box>
      <Box rounded="lg">rounded=lg</Box>
      <Box rounded="full">rounded=full</Box>
    </Canvas>
  );
}
