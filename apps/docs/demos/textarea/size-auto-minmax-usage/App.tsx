import { Flex, Textarea } from "@optiaxiom/react";

export function App() {
  return (
    <Flex maxW="xs" w="full">
      <Textarea
        maxRows={3}
        placeholder="Enter text..."
        resize="auto"
        rows={1}
      />
    </Flex>
  );
}
