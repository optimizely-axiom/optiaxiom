import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field label="Project description" showCount>
      <Input maxLength={50} placeholder="Enter description..." />
    </Field>
  );
}
