import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box paddingTop="sm">paddingTop=sm</Box>
      <Box paddingRight="md">paddingRight=md</Box>
      <Box paddingBottom="lg">paddingBottom=lg</Box>
      <Box paddingLeft="xl">paddingLeft=xl</Box>
    </Canvas>
  );
}
