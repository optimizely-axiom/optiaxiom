"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Group } from "@optiaxiom/react";

export function App({
  gap = "16",
}: Pick<ComponentPropsWithoutRef<typeof Group>, "gap">) {
  return (
    <Group gap={gap}>
      <DemoBox p="12">01</DemoBox>
      <DemoBox p="16">02</DemoBox>
      <DemoBox p="12">03</DemoBox>
    </Group>
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
