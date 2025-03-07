import { Canvas } from "@/demos/Canvas";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas
      alignItems="end"
      flexDirection="row"
      justifyContent="center"
      striped
      style={{ height: "576px" }}
    >
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
