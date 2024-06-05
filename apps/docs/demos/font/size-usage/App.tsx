import { Text } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="fontSize">
      <Text fontSize="sm">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontSize="md">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontSize="lg">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontSize="xl">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontSize="2xl">The quick brown fox jumps over the lazy dog.</Text>
    </Canvas>
  );
}
