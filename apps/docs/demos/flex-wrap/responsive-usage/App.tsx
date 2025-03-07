"use client";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Flex flexDirection="row" flexWrap={["wrap", "nowrap"]} w="auto">
        <Box flex="none" w="224">
          01
        </Box>
        <Box flex="none" w="224">
          02
        </Box>
        <Box flex="none" w="224">
          03
        </Box>
      </Flex>
    </Canvas>
  );
}
