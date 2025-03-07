import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas>
      <Box bg="bg.success.light">bg=bg.success.light</Box>
      <Box bg="bg.warning.light">bg=bg.warning.light</Box>
    </Canvas>
  );
}
