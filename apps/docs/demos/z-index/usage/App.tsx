import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box z="40">05</Box>
      <Box z="30">04</Box>
      <Box z="20">03</Box>
      <Box z="10">02</Box>
      <Box z="0">01</Box>
    </Canvas>
  );
}
