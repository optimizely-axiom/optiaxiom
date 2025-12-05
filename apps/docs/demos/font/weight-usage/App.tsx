import type { ComponentPropsWithoutRef } from "react";

import { Flex, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <DemoItem fontWeight="400">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontWeight="500">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontWeight="600">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontWeight="700">
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
        {props.fontWeight}
      </Text>
      <Text {...props}>{children}</Text>
    </div>
  );
}
