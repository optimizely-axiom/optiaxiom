import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box m="0.5">m=0.5</Box>
      <Box m="sm">m=sm</Box>
      <Box m="md">m=md</Box>
      <Box m="lg">m=lg</Box>
    </Canvas>
  );
}
