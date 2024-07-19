import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field label="Input label" required>
      <Input placeholder="Enter text..." />
    </Field>
  );
}
