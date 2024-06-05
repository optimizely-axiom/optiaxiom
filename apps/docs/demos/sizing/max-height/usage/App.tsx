import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box display={["none", "grid"]} h="full" maxH="xl">
        maxH=xl
      </Box>
      <Box display={["none", "grid"]} h="full" maxH="lg">
        maxH=lg
      </Box>
      <Box h="full" maxH="md">
        maxH=md
      </Box>
      <Box h="full" maxH="sm">
        maxH=sm
      </Box>
      <Box h="full" maxH="xs">
        maxH=xs
      </Box>
    </Canvas>
  );
}
