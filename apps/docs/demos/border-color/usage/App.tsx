import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas transparent>
      <Box border="2" borderColor="border.secondary">
        border.secondary
      </Box>
      <Box border="2" borderColor="border.accent">
        border.accent
      </Box>
      <Box border="2" borderColor="border.warning">
        border.warning
      </Box>
    </Canvas>
  );
}
