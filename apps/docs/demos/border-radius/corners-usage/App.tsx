import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box roundedTL="md">roundedTL=md</Box>
      <Box roundedTR="md">roundedTR=md</Box>
      <Box roundedBR="md">roundedBR=md</Box>
      <Box roundedBL="md">roundedBL=md</Box>
    </Canvas>
  );
}
