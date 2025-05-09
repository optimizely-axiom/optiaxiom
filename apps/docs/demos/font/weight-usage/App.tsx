import { Text } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="fontWeight">
      <Text fontWeight="400">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontWeight="500">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontWeight="600">The quick brown fox jumps over the lazy dog.</Text>
      <Text fontWeight="700">The quick brown fox jumps over the lazy dog.</Text>
    </Canvas>
  );
}
