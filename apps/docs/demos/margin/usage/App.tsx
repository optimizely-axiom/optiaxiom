import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Group
      alignItems="center"
      flexDirection={["column", "row"]}
      gap="16"
      justifyContent="space-around"
      w="full"
    >
      <DemoBox m="4">m=4</DemoBox>
      <DemoBox m="8">m=8</DemoBox>
      <DemoBox m="16">m=16</DemoBox>
      <DemoBox m="24">m=24</DemoBox>
    </Group>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box rounded="sm" style={stripes}>
      <Box
        bg="bg.avatar.purple"
        fontFamily="mono"
        fontSize="md"
        fontWeight="600"
        p="16"
        rounded="sm"
        textAlign="center"
        {...props}
      >
        {children}
      </Box>
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
