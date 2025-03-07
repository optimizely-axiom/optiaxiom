import { Canvas } from "@/demos/Canvas";
import { Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild>
      <Grid gridTemplateColumns="3">
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
        <div>06</div>
        <div>07</div>
      </Grid>
    </Canvas>
  );
}
