import { Code, Em, Kbd, Strong, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Text fontSize="lg">
      This is a paragraph showcasing <Strong>bold text</Strong>,{" "}
      <Em>italic emphasis</Em>, computer <Code>code</Code>, and even hotkey
      combination <Kbd keys="command">K</Kbd> within text.
    </Text>
  );
}
