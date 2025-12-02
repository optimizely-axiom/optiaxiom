import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field label="Email address" required>
      <Input placeholder="name@example.com" type="email" />
    </Field>
  );
}
