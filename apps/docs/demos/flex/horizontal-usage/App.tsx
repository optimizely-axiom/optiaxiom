import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas asChild>
      <Flex flexDirection="row">
        <Box p="12">01</Box>
        <Box p="16">02</Box>
        <Box p="12">03</Box>
      </Flex>
    </Canvas>
  );
}
