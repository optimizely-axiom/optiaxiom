import { DateInput, Field } from "@optiaxiom/react";

export function App() {
  return (
    <Field label="Select date">
      <DateInput addonAfter="UTC" />
    </Field>
  );
}
