import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas alignItems="center">
      <Box m="24">m=24</Box>
      <Box mx="24">mx=24</Box>
      <Box my="24">my=24</Box>
    </Canvas>
  );
}
