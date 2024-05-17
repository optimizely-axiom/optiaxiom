import { Box } from "@optiaxiom/react";

import { Canvas } from "../ring-width/Canvas";

export function App() {
  return (
    <Canvas>
      <Box ring="2" ringColor="blue.500">
        ringColor=blue.500
      </Box>
      <Box ring="2" ringColor="purple.500">
        ringColor=purple.500
      </Box>
    </Canvas>
  );
}
