import type { ComponentPropsWithoutRef } from "react";

import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box flexDirection="row" flexWrap={["wrap", "nowrap"]} gap="16">
      <DemoBox flex="none" w="224">
        01
      </DemoBox>
      <DemoBox flex="none" w="224">
        02
      </DemoBox>
      <DemoBox flex="none" w="224">
        03
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
