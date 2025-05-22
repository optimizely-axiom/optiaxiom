import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas alignItems="center">
      <Box m="4">m=4</Box>
      <Box m="8">m=8</Box>
      <Box m="16">m=16</Box>
      <Box m="24">m=24</Box>
    </Canvas>
  );
}
