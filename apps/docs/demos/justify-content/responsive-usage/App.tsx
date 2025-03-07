"use client";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild striped>
      <Flex flexDirection="row" justifyContent={["center", "flex-end"]}>
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
      </Flex>
    </Canvas>
  );
}
