import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas flexDirection="column" w="auto">
      <Box display={["none", "block"]} w="384">
        w=384
      </Box>
      <Box w="224">w=224</Box>
      <Box w="3xl">w=3xl</Box>
      <Box w="64">w=64</Box>
    </Canvas>
  );
}
