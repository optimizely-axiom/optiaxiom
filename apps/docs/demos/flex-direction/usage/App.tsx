"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  flexDirection = "column",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "flexDirection">) {
  return (
    <Canvas asChild>
      <Flex flexDirection={flexDirection}>
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
      </Flex>
    </Canvas>
  );
}
