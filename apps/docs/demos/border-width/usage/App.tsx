import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas transparent>
      <Box border="1">border=1</Box>
      <Box border="2">border=2</Box>
    </Canvas>
  );
}
