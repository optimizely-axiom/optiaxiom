"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  alignSelf = "center",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "alignSelf">) {
  return (
    <Canvas asChild striped>
      <Flex flexDirection="row" h="224">
        <Box flex="1" p="64">
          01
        </Box>
        <Box alignSelf={alignSelf} flex="1" p="32">
          02
        </Box>
        <Box flex="1" p="64">
          03
        </Box>
      </Flex>
    </Canvas>
  );
}
