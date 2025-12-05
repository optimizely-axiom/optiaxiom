"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

export function App({
  flexWrap = "nowrap",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "flexWrap">) {
  return (
    <Flex flexDirection="row" flexWrap={flexWrap} w="auto">
      <DemoBox flex="none" w="224">
        01
      </DemoBox>
      <DemoBox flex="none" w="224">
        02
      </DemoBox>
      <DemoBox flex="none" w="224">
        03
      </DemoBox>
    </Flex>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.purple"
      display="grid"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      p="16"
      placeItems="center"
      rounded="sm"
      {...props}
    >
      {children}
    </Box>
  );
}
