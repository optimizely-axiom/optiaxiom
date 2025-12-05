import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Flex
      alignItems="end"
      flexDirection="row"
      justifyContent="center"
      rounded="md"
      style={{ height: "576px", ...stripes }}
      w="full"
    >
      <DemoBox display={["none", "grid"]} h="full" maxH="lg">
        maxH=lg
      </DemoBox>
      <DemoBox h="full" maxH="md">
        maxH=md
      </DemoBox>
      <DemoBox h="full" maxH="sm">
        maxH=sm
      </DemoBox>
      <DemoBox h="full" maxH="xs">
        maxH=xs
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
