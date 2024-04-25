import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas padding="xs">
      <Box marginTop="-0.5">marginTop=-0.5</Box>
      <Box marginRight="-md">marginRight=-md</Box>
      <Box marginBottom="-lg">marginBottom=-lg</Box>
      <Box marginLeft="-xl">marginLeft=-xl</Box>
    </Canvas>
  );
}
