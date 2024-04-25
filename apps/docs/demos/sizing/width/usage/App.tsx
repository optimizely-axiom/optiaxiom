import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box width={40}>width=40</Box>
      <Box width={32}>width=32</Box>
      <Box width={24}>width=24</Box>
      <Box width={20}>width=20</Box>
      <Box width={16}>width=16</Box>
    </Canvas>
  );
}
