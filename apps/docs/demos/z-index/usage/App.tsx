import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="0" style={{ isolation: "isolate" }}>
      <DemoBox z="popover">05</DemoBox>
      <DemoBox z="30">04</DemoBox>
      <DemoBox z="20">03</DemoBox>
      <DemoBox z="10">02</DemoBox>
      <DemoBox z="0">01</DemoBox>
    </Group>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.purple"
      border="2"
      display="grid"
      fontFamily="mono"
      fontWeight="600"
      placeItems="center"
      rounded="full"
      size="56"
      style={{
        borderColor: theme.colors["bg.default"],
        marginLeft: "-12px",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
