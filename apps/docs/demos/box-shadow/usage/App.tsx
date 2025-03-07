import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas outside transparent>
      <Box shadow="sm">shadow=sm</Box>
      <Box shadow="md">shadow=md</Box>
      <Box shadow="lg">shadow=lg</Box>
    </Canvas>
  );
}
