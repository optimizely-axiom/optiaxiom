import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field error="Field is required" label="Input label">
      <Input placeholder="Enter text..." />
    </Field>
  );
}
