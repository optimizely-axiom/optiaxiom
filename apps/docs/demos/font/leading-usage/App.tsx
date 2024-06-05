import { Text } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="leading">
      <Text fontSize="lg" leading="tight">
        Lorem Ipsum is a placeholder text commonly used in the design and
        printing industries. Despite its widespread use, the origins of Lorem
        Ipsum are somewhat mysterious. Several theories exist about who may have
        invented the text, but no one knows.
      </Text>
      <Text fontSize="lg" leading="normal">
        Lorem Ipsum is a placeholder text commonly used in the design and
        printing industries. Despite its widespread use, the origins of Lorem
        Ipsum are somewhat mysterious. Several theories exist about who may have
        invented the text, but no one knows.
      </Text>
      <Text fontSize="lg" leading="loose">
        Lorem Ipsum is a placeholder text commonly used in the design and
        printing industries. Despite its widespread use, the origins of Lorem
        Ipsum are somewhat mysterious. Several theories exist about who may have
        invented the text, but no one knows.
      </Text>
    </Canvas>
  );
}
