import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box display={["none", "grid"]} h="40">
        h=40
      </Box>
      <Box display={["none", "grid"]} h="32">
        h=32
      </Box>
      <Box h="24">h=24</Box>
      <Box h="20">h=20</Box>
      <Box h="16">h=16</Box>
    </Canvas>
  );
}
