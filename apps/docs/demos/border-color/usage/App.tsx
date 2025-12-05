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
      <DemoBox border="2" borderColor="border.secondary">
        border.secondary
      </DemoBox>
      <DemoBox border="2" borderColor="border.accent">
        border.accent
      </DemoBox>
      <DemoBox border="2" borderColor="border.warning">
        border.warning
      </DemoBox>
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
