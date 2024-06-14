import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Flex alignItems="start" flexDirection="row" justifyContent="center">
        <Box size="64">size=64</Box>
        <Box size="80">size=80</Box>
        <Box size="96">size=96</Box>
        <Box display={["none", "grid"]} size="128">
          size=128
        </Box>
        <Box display={["none", "grid"]} size="160">
          size=160
        </Box>
      </Flex>
    </Canvas>
  );
}
