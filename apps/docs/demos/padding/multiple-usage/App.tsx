import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas alignItems="center" shaded>
      <Box p="24">p=24</Box>
      <Box px="24">px=24</Box>
      <Box py="24">py=24</Box>
    </Canvas>
  );
}
