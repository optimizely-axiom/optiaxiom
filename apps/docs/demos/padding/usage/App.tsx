import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box p="32">p=32</Box>
      <Box p="12">p=12</Box>
      <Box p="16">p=16</Box>
      <Box p="24">p=24</Box>
    </Canvas>
  );
}
