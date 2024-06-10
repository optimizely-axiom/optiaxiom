import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box display={["none", "grid"]} h="320">
        h=320
      </Box>
      <Box display={["none", "grid"]} h="256">
        h=256
      </Box>
      <Box h="192">h=192</Box>
      <Box h="160">h=160</Box>
      <Box h="128">h=128</Box>
    </Canvas>
  );
}
