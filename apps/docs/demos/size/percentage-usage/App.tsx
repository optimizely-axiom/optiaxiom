import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas flexDirection="column" striped>
      <Box size="1/2">size=1/2</Box>
      <Box size="2/3">size=2/3</Box>
      <Box size="full">size=full</Box>
    </Canvas>
  );
}
