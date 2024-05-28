import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderColor="border.default">border.default</Box>
      <Box borderColor="border.brand">border.brand</Box>
      <Box borderColor="border.warning">border.warning</Box>
    </Canvas>
  );
}
