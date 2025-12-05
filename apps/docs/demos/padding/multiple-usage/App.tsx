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
      <DemoBox p="24">p=24</DemoBox>
      <DemoBox px="24">px=24</DemoBox>
      <DemoBox py="24">py=24</DemoBox>
    </Flex>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.purple"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      rounded="sm"
      {...props}
    >
      <Text bg="bg.default.pressed" p="4" rounded="inherit">
        {children}
      </Text>
    </Box>
  );
}
