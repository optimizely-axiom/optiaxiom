import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box outline="1" outlineColor="blue.200">
        outline=1
      </Box>
      <Box outline="2" outlineColor="blue.200">
        outline=2
      </Box>
      <Box outline="4" outlineColor="blue.200">
        outline=4
      </Box>
    </Canvas>
  );
}
