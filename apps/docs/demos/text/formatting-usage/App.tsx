import { Code, Kbd, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Text fontSize="lg">
      This is a paragraph showcasing <strong>bold text</strong>,{" "}
      <em>italic emphasis</em>, computer <Code>code</Code>, and even hotkey
      combination <Kbd keys="command">K</Kbd> within text.
    </Text>
  );
}
