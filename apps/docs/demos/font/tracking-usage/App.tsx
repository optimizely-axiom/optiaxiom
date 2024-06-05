import { Text } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="tracking">
      <Text fontSize="xl" fontWeight="500" tracking="tight">
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Text fontSize="xl" fontWeight="500" tracking="normal">
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Text fontSize="xl" fontWeight="500" tracking="wide">
        The quick brown fox jumps over the lazy dog.
      </Text>
    </Canvas>
  );
}
