import type { ComponentPropsWithoutRef } from "react";

import { Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <DemoItem textAlign="start">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </DemoItem>
      <DemoItem textAlign="center">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </DemoItem>
      <DemoItem textAlign="end">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </DemoItem>
      <DemoItem textAlign="justify">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </DemoItem>
    </Group>
  );
}

function DemoItem({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Text>) {
  return (
    <div>
      <Text color="fg.tertiary" fontFamily="mono" fontWeight="600">
        {props.textAlign}
      </Text>
      <Text {...props}>{children}</Text>
    </div>
  );
}
