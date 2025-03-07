"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App({
  gap = "16",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "gap">) {
  return (
    <Canvas asChild>
      <Flex flexDirection="row" gap={gap}>
        <Box p="12">01</Box>
        <Box p="16">02</Box>
        <Box p="12">03</Box>
      </Flex>
    </Canvas>
  );
}
