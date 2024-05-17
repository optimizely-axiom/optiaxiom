import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box ring="1">ring=1</Box>
      <Box ring="2">ring=2</Box>
      <Box ring="4">ring=4</Box>
    </Canvas>
  );
}
