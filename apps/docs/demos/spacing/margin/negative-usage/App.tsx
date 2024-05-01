import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas p="xs">
      <Box mt="-4">mt=-4</Box>
      <Box mr="-md">mr=-md</Box>
      <Box mb="-lg">mb=-lg</Box>
      <Box ml="-xl">ml=-xl</Box>
    </Canvas>
  );
}
