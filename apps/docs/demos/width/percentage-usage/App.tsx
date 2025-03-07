import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="column" w="full">
      <Canvas flexDirection="row">
        <Box w="1/2">w=1/2</Box>
        <Box w="1/2">w=1/2</Box>
      </Canvas>

      <Canvas flexDirection="row">
        <Box w="1/3">w=1/3</Box>
        <Box w="2/3">w=2/3</Box>
      </Canvas>

      <Canvas display={["none", "flex"]} flexDirection="row">
        <Box w="1/4">w=1/4</Box>
        <Box w="3/4">w=3/4</Box>
      </Canvas>
    </Flex>
  );
}
