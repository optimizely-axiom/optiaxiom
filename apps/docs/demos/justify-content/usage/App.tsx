"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App({
  justifyContent = "flex-start",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "justifyContent">) {
  return (
    <Canvas asChild striped>
      <Flex flexDirection="row" justifyContent={justifyContent}>
        <Box>01</Box>
        <Box>02</Box>
        <Box>03</Box>
      </Flex>
    </Canvas>
  );
}
