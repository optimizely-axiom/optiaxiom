"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App({
  flex = "1",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "flex">) {
  return (
    <Canvas asChild striped>
      <Flex flexDirection="row" h="224">
        <Box flex={flex} w="224">
          01
        </Box>
        <Box flex={flex} w="80">
          02
        </Box>
      </Flex>
    </Canvas>
  );
}
