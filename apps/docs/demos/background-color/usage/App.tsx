import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box bg="bg.accent.strong">bg=bg.accent.strong</Box>
      <Box bg="bg.error.strong">bg=bg.error.strong</Box>
    </Canvas>
  );
}
