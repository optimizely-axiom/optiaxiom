"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, theme } from "@optiaxiom/react";

export function App({
  flex = "1",
}: Pick<ComponentPropsWithoutRef<typeof Box>, "flex">) {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="row"
      gap="16"
      h="224"
      rounded="md"
      style={stripes}
      w="full"
    >
      <DemoBox flex={flex} w="224">
        01
      </DemoBox>
      <DemoBox flex={flex} w="80">
        02
      </DemoBox>
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
