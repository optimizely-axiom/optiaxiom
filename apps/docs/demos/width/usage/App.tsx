import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Flex>
        <Box w="384">w=384</Box>
        <Box w="224">w=224</Box>
        <Box w="5xl">w=5xl</Box>
        <Box w="xl">w=xl</Box>
        <Box w="lg">w=lg</Box>
      </Flex>
    </Canvas>
  );
}
