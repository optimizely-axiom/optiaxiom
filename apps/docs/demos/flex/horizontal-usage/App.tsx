import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Flex flexDirection="row">
        <Box p="sm">01</Box>
        <Box p="md">02</Box>
        <Box p="sm">03</Box>
      </Flex>
    </Canvas>
  );
}
