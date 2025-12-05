"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex, theme } from "@optiaxiom/react";

export function App({
  alignSelf = "center",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "alignSelf">) {
  return (
    <Flex flexDirection="row" h="224" rounded="md" style={stripes} w="full">
      <DemoBox flex="1" p="64">
        01
      </DemoBox>
      <DemoBox alignSelf={alignSelf} flex="1" p="32">
        02
      </DemoBox>
      <DemoBox flex="1" p="64">
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
      placeItems="center"
      rounded="sm"
      {...props}
    >
      {children}
    </Box>
  );
}

const stripes = {
  backgroundColor: theme.colors["bg.secondary"],
  backgroundImage: `
    linear-gradient(
      135deg,
      ${theme.colors["bg.avatar.neutral"]} 10%,
      transparent 0,
      transparent 50%,
      ${theme.colors["bg.avatar.neutral"]} 0,
      ${theme.colors["bg.avatar.neutral"]} 60%,
      transparent 0,
      transparent
    )
  `,
  backgroundSize: "7px 7px",
};
