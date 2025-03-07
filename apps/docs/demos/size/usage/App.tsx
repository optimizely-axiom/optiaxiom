import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas alignItems="start" outside>
      <Box size="xs">size=xs</Box>
      <Box size="sm">size=sm</Box>
      <Box size="md">size=md</Box>
      <Box size="lg">size=lg</Box>
      <Box size="xl">size=xl</Box>
    </Canvas>
  );
}
