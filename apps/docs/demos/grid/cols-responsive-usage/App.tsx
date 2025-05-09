import { Canvas } from "@/demos/Canvas";
import { Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Grid gridTemplateColumns={["1", "2"]}>
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
      </Grid>
    </Canvas>
  );
}
