import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex
      alignItems="center"
      flexDirection={["column", "row"]}
      justifyContent="space-around"
      w="full"
    >
      <DemoBox shadow="sm">shadow=sm</DemoBox>
      <DemoBox shadow="md">shadow=md</DemoBox>
      <DemoBox shadow="lg">shadow=lg</DemoBox>
    </Flex>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Flex alignItems="center" gap="8">
      <Text
        color="fg.tertiary"
        fontFamily="mono"
        fontSize="md"
        fontWeight="600"
        textAlign="center"
      >
        {children}
      </Text>
      <Box display="grid" placeItems="center" size="56" {...props} />
    </Flex>
  );
}
