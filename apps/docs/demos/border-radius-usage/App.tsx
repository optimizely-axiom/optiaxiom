import { Box } from "@optiaxiom/react";

import { Canvas } from "./Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderRadius="sm">sm</Box>
      <Box borderRadius="md">md</Box>
      <Box borderRadius="lg">lg</Box>
      <Box borderRadius="full">full</Box>
    </Canvas>
  );
}
