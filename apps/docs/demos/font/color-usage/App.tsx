import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="color">
      <Box color="fg.error" fontSize="lg">
        The quick brown fox jumps over the lazy dog.
      </Box>
      <Box color="fg.success" fontSize="lg">
        The quick brown fox jumps over the lazy dog.
      </Box>
    </Canvas>
  );
}
