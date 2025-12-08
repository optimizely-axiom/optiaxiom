"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box } from "@optiaxiom/react";

export function App({
  flexDirection = "column",
}: Pick<ComponentPropsWithoutRef<typeof Box>, "flexDirection">) {
  return (
    <Box display="flex" flexDirection={flexDirection} gap="16" w="full">
      <DemoBox>01</DemoBox>
      <DemoBox>02</DemoBox>
      <DemoBox>03</DemoBox>
    </Box>
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
