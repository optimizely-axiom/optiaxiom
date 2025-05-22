import type { ComponentPropsWithoutRef } from "react";

import { Grid } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  gridTemplateColumns = "3",
}: Pick<ComponentPropsWithoutRef<typeof Grid>, "gridTemplateColumns">) {
  return (
    <Canvas asChild>
      <Grid gridTemplateColumns={gridTemplateColumns}>
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
