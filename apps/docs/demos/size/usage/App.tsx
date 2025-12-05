import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex
      alignItems="start"
      flexDirection={["column", "row"]}
      justifyContent="space-around"
      w="full"
    >
      <DemoBox size="xs">size=xs</DemoBox>
      <DemoBox size="sm">size=sm</DemoBox>
      <DemoBox size="md">size=md</DemoBox>
      <DemoBox size="lg">size=lg</DemoBox>
      <DemoBox size="xl">size=xl</DemoBox>
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
      <Box bg="bg.avatar.purple" rounded="sm" {...props} />
    </Flex>
  );
}
