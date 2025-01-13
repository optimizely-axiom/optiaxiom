import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderColor="border.tertiary">border.tertiary</Box>
      <Box borderColor="border.accent">border.accent</Box>
      <Box borderColor="border.warning">border.warning</Box>
    </Canvas>
  );
}
