import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field info="This is additional information" label="Input label">
      <Input placeholder="Enter text..." />
    </Field>
  );
}
