import type { ComponentPropsWithoutRef } from "react";

import { Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <DemoItem fontSize="sm">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontSize="md">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontSize="lg">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontSize="xl">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
      <DemoItem fontSize="2xl">
        The quick brown fox jumps over the lazy dog.
      </DemoItem>
    </Group>
  );
}

function DemoItem({
  children,
  fontSize,
}: Pick<ComponentPropsWithoutRef<typeof Text>, "children"> & {
  fontSize: Extract<ComponentPropsWithoutRef<typeof Text>["fontSize"], string>;
}) {
  return (
    <div>
      <Text color="fg.tertiary" fontFamily="mono" fontWeight="600">
        {fontSize}
      </Text>
      <Text fontSize={fontSize}>{children}</Text>
    </div>
  );
}
