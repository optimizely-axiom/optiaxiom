import { Canvas } from "@/demos/Canvas";
import { Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Flex flexDirection="column">
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </Flex>
    </Canvas>
  );
}
