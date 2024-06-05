import { Text } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="fontFamily">
      <Text fontFamily="sans" fontSize="xl" fontWeight="500">
        The quick brown fox jumps over the lazy dog.
      </Text>
      <Text fontFamily="mono" fontSize="xl" fontWeight="500">
        The quick brown fox jumps over the lazy dog.
      </Text>
    </Canvas>
  );
}
