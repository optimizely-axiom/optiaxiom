import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderT="2">borderT=2</Box>
      <Box borderR="2">borderR=2</Box>
      <Box borderB="2">borderB=2</Box>
      <Box borderL="2">borderL=2</Box>
    </Canvas>
  );
}
