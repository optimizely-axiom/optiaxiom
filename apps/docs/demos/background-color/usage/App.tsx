import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box bg="bg.accent">bg=bg.accent</Box>
      <Box bg="bg.error">bg=bg.error</Box>
    </Canvas>
  );
}
