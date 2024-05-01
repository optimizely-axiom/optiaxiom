import { Box } from "@optiaxiom/react";

import { Canvas } from "./Canvas";

export function App() {
  return (
    <Canvas>
      <Box rounded="sm">sm</Box>
      <Box rounded="md">md</Box>
      <Box rounded="lg">lg</Box>
      <Box rounded="full">full</Box>
    </Canvas>
  );
}
