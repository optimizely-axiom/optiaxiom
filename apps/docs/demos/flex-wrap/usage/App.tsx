"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App({
  flexWrap = "nowrap",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "flexWrap">) {
  return (
    <Canvas asChild>
      <Flex flexDirection="row" flexWrap={flexWrap} w="auto">
        <Box flex="none" w="224">
          01
        </Box>
        <Box flex="none" w="224">
          02
        </Box>
        <Box flex="none" w="224">
          03
        </Box>
      </Flex>
    </Canvas>
  );
}
