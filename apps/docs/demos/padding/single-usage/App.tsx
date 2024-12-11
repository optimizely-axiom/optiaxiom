import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box pt="12">pt=12</Box>
      <Box pr="16">pr=16</Box>
      <Box pb="24">pb=24</Box>
      <Box pl="32">pl=32</Box>
    </Canvas>
  );
}
