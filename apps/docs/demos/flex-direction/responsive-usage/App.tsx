"use client";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Flex flexDirection={["column", "row"]} w="auto">
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
      </Flex>
    </Canvas>
  );
}
