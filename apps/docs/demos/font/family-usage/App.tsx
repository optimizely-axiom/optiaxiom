import type { ComponentPropsWithoutRef } from "react";

import { Flex, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <DemoItem fontFamily="sans">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontFamily="mono">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
    </Flex>
  );
}

function DemoItem({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Text>) {
  return (
    <div>
      <Text color="fg.tertiary" fontFamily="mono" fontWeight="600">
        {props.fontFamily}
      </Text>
      <Text fontSize="xl" fontWeight="500" {...props}>
        {children}
      </Text>
    </div>
  );
}
