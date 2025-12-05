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
      <DemoBox rounded="sm">rounded=sm</DemoBox>
      <DemoBox rounded="md">rounded=md</DemoBox>
      <DemoBox rounded="lg">rounded=lg</DemoBox>
      <DemoBox rounded="full">rounded=full</DemoBox>
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
      <Box
        bg="bg.avatar.purple"
        display="grid"
        placeItems="center"
        size="56"
        {...props}
      />
    </Flex>
  );
}
