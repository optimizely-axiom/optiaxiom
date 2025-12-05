import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex
      alignItems="center"
      flexDirection={["column", "row"]}
      justifyContent="space-around"
      w="full"
    >
      <DemoBox borderT="2">borderT=2</DemoBox>
      <DemoBox borderR="2">borderR=2</DemoBox>
      <DemoBox borderB="2">borderB=2</DemoBox>
      <DemoBox borderL="2">borderL=2</DemoBox>
    </Flex>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
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
