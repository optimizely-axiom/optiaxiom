import { Box } from "@optiaxiom/react";

import { Canvas } from "../outline-width/Canvas";

export function App() {
  return (
    <Canvas>
      <Box outline="2" outlineOffset="0">
        outlineOffset=0
      </Box>
      <Box outline="2" outlineOffset="2">
        outlineOffset=2
      </Box>
      <Box outline="2" outlineOffset="4">
        outlineOffset=4
      </Box>
    </Canvas>
  );
}
