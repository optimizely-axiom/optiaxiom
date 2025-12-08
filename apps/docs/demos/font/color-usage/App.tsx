import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <DemoItem color="fg.error">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem color="fg.success">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
    </Group>
  );
}

function DemoItem({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <div>
      <Text color="fg.tertiary" fontFamily="mono" fontWeight="600">
        {props.color}
      </Text>
      <Text fontSize="lg" {...props}>
        {children}
      </Text>
    </div>
  );
}
