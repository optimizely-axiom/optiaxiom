import { Textarea } from "@optiaxiom/react";

export function App() {
  return (
    <Textarea
      maxRows={3}
      minRows={1}
      placeholder="Enter text..."
      resize="auto"
    />
  );
}
