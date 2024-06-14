import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Flex>
        <Box w="320">w=320</Box>
        <Box w="256">w=256</Box>
        <Box w="192">w=192</Box>
        <Box w="160">w=160</Box>
        <Box w="128">w=128</Box>
      </Flex>
    </Canvas>
  );
}
