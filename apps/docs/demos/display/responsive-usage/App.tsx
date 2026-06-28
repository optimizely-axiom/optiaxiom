import type { ComponentPropsWithoutRef } from "react";

import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box display={["none", "flex"]} gap="16">
      <DemoBox>01</DemoBox>
      <DemoBox>02</DemoBox>
      <DemoBox>03</DemoBox>
      <DemoBox>04</DemoBox>
    </Box>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.success.subtle"
      color="fg.success.strong"
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
