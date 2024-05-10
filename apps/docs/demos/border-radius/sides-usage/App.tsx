import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box roundedT="md">roundedT=md</Box>
      <Box roundedR="md">roundedR=md</Box>
      <Box roundedB="md">roundedB=md</Box>
      <Box roundedL="md">roundedL=md</Box>
    </Canvas>
  );
}
