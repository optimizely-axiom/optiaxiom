import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box marginTop="sm">marginTop=sm</Box>
      <Box marginRight="md">marginRight=md</Box>
      <Box marginBottom="lg">marginBottom=lg</Box>
      <Box marginLeft="xl">marginLeft=xl</Box>
    </Canvas>
  );
}
