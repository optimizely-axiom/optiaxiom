import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box display={["none", "grid"]} height="40">
        height=40
      </Box>
      <Box display={["none", "grid"]} height="32">
        height=32
      </Box>
      <Box height="24">height=24</Box>
      <Box height="20">height=20</Box>
      <Box height="16">height=16</Box>
    </Canvas>
  );
}
