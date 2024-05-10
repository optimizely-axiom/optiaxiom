import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderTop="1">borderTop=1</Box>
      <Box borderRight="1">borderRight=1</Box>
      <Box borderBottom="1">borderBottom=1</Box>
      <Box borderLeft="1">borderLeft=1</Box>
    </Canvas>
  );
}
