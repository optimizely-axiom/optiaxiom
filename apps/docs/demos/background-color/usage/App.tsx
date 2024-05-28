import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box bg="bg.brand.solid">bg=bg.brand.solid</Box>
      <Box bg="bg.error.solid">bg=bg.error.solid</Box>
    </Canvas>
  );
}
