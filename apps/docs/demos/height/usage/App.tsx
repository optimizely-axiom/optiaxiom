import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas alignItems="end" flexDirection="row" justifyContent="center">
      <Box display={["none", "grid"]} h="384">
        h=384
      </Box>
      <Box display={["none", "grid"]} h="224">
        h=224
      </Box>
      <Box h="3xl">h=3xl</Box>
      <Box h="64">h=64</Box>
      <Box h="xl">h=xl</Box>
    </Canvas>
  );
}
