import { Text } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas name="textAlign">
      <Text textAlign="start">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </Text>
      <Text textAlign="center">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </Text>
      <Text textAlign="end">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </Text>
      <Text textAlign="justify">
        Duis id tellus condimentum, tincidunt nulla a, pellentesque dolor. Etiam
        tristique est eu sodales pellentesque. Sed odio eros, mattis a turpis
        non, vulputate bibendum mauris.
      </Text>
    </Canvas>
  );
}
