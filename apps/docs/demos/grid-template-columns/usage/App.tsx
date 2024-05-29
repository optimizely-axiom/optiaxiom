import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box cols="3" display="grid">
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
        <Box>04</Box>
        <Box>05</Box>
        <Box>06</Box>
        <Box>07</Box>
      </Box>
    </Canvas>
  );
}
