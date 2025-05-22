import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas>
      <Box bg="bg.success.light">bg=bg.success.light</Box>
      <Box bg="bg.warning.light">bg=bg.warning.light</Box>
    </Canvas>
  );
}
