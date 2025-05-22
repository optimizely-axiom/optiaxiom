"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  alignItems = "center",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "alignItems">) {
  return (
    <Canvas asChild striped>
      <Flex alignItems={alignItems} flexDirection="row" h="224">
        <Box flex="1" p="32">
          01
        </Box>
        <Box flex="1" p="64">
          02
        </Box>
        <Box flex="1" p="48">
          03
        </Box>
      </Flex>
    </Canvas>
  );
}
