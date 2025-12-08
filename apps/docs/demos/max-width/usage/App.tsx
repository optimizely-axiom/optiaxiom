import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Group
      flexDirection="column"
      gap="16"
      rounded="md"
      style={stripes}
      w="full"
    >
      <DemoBox maxW="lg" w="full">
        maxW=lg
      </DemoBox>
      <DemoBox maxW="md" w="full">
        maxW=md
      </DemoBox>
      <DemoBox maxW="sm" w="full">
        maxW=sm
      </DemoBox>
      <DemoBox maxW="xs" w="full">
        maxW=xs
      </DemoBox>
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
