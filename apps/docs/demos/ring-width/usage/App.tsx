import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box ring="1" ringColor="blue.200">
        ring=1
      </Box>
      <Box ring="2" ringColor="blue.200">
        ring=2
      </Box>
      <Box ring="4" ringColor="blue.200">
        ring=4
      </Box>
    </Canvas>
  );
}
