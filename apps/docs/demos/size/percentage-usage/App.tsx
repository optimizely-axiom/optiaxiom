import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas p="xs">
      <Flex>
        <Box size="1/2">size=1/2</Box>
        <Box size="2/3">size=2/3</Box>
        <Box size="full">size=full</Box>
      </Flex>
    </Canvas>
  );
}
