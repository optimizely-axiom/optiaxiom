import { Field, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Field error="Please enter a valid email address" label="Email">
      <Input defaultValue="invalid-email" type="email" />
    </Field>
  );
}
