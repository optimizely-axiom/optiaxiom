import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas p="8">
      <Box mt="-4">mt=-4</Box>
      <Box mr="-16">mr=-16</Box>
      <Box mb="-24">mb=-24</Box>
      <Box ml="-32">ml=-32</Box>
    </Canvas>
  );
}
