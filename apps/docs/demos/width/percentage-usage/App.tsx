import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas w="full">
      <Flex flexDirection="row">
        <Box w="1/2">w=1/2</Box>
        <Box w="1/2">w=1/2</Box>
      </Flex>

      <Flex flexDirection="row">
        <Box w="1/3">w=1/3</Box>
        <Box w="2/3">w=2/3</Box>
      </Flex>

      <Flex display={["none", "flex"]} flexDirection="row">
        <Box w="1/4">w=1/4</Box>
        <Box w="3/4">w=3/4</Box>
      </Flex>
    </Canvas>
  );
}
