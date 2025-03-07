import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas alignItems="center">
      <Box mt="12">mt=12</Box>
      <Box mr="16">mr=16</Box>
      <Box mb="24">mb=24</Box>
      <Box ml="32">ml=32</Box>
    </Canvas>
  );
}
