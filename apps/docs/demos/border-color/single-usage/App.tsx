import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box borderTColor="purple.500">borderTColor</Box>
      <Box borderRColor="purple.500">borderRColor</Box>
      <Box borderBColor="purple.500">borderBColor</Box>
      <Box borderLColor="purple.500">borderLColor</Box>
    </Canvas>
  );
}
