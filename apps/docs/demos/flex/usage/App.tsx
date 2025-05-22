import { Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas asChild>
      <Flex>
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </Flex>
    </Canvas>
  );
}
