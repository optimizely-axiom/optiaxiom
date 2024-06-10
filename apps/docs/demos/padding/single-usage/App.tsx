import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box pt="sm">pt=sm</Box>
      <Box pr="md">pr=md</Box>
      <Box pb="lg">pb=lg</Box>
      <Box pl="xl">pl=xl</Box>
    </Canvas>
  );
}
