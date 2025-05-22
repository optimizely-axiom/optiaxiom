"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  alignItems = "center",
  flexDirection = "row",
  justifyContent = "center",
}: Pick<
  ComponentPropsWithoutRef<typeof Flex>,
  "alignItems" | "flexDirection" | "justifyContent"
>) {
  return (
    <Canvas asChild striped>
      <Flex
        alignItems={alignItems}
        flexDirection={flexDirection}
        h="224"
        justifyContent={justifyContent}
      >
        <Box p="12">01</Box>
        <Box p="16">02</Box>
        <Box p="12">03</Box>
      </Flex>
    </Canvas>
  );
}
