import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Flex flexDirection="row">
        <Box p="12">01</Box>
        <Box p="16">02</Box>
        <Box p="12">03</Box>
      </Flex>
    </Canvas>
  );
}
