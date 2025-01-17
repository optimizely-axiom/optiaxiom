"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App({
  gap = "16",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "gap">) {
  return (
    <Canvas>
      <Flex flexDirection="row" gap={gap}>
        <Box p="12">01</Box>
        <Box p="16">02</Box>
        <Box p="12">03</Box>
      </Flex>
    </Canvas>
  );
}
