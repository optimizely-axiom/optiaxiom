import type { ComponentPropsWithoutRef } from "react";

import { Box, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group
      alignItems="center"
      flexDirection={["column", "row"]}
      gap="16"
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
    </Group>
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
