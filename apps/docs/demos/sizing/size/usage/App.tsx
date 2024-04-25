import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box size={8}>size=8</Box>
      <Box size={10}>size=10</Box>
      <Box size={12}>size=12</Box>
      <Box size={16}>size=16</Box>
      <Box size={20}>size=20</Box>
    </Canvas>
  );
}
