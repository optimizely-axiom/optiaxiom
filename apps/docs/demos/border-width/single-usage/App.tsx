import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderT="4">borderT=4</Box>
      <Box borderR="4">borderR=4</Box>
      <Box borderB="4">borderB=4</Box>
      <Box borderL="4">borderL=4</Box>
    </Canvas>
  );
}
