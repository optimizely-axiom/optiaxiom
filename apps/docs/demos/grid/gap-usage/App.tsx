"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Grid } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  gap = "16",
}: Pick<ComponentPropsWithoutRef<typeof Grid>, "gap">) {
  return (
    <Canvas asChild>
      <Grid gap={gap} gridTemplateColumns="2">
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
        <Box>04</Box>
      </Grid>
    </Canvas>
  );
}
