import { Box } from "@optiaxiom/react";

import { Canvas } from "../outline-width/Canvas";

export function App() {
  return (
    <Canvas>
      <Box outline="2" outlineColor="blue.500">
        outlineColor=blue.500
      </Box>
      <Box outline="2" outlineColor="purple.500">
        outlineColor=purple.500
      </Box>
    </Canvas>
  );
}
