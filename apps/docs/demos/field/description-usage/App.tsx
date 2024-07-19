import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field description="Input description" label="Input label">
      <Input placeholder="Enter text..." />
    </Field>
  );
}
