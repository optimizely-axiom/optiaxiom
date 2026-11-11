import { Field, Textarea } from "@optiaxiom/react";

export function App() {
  return (
    <Field description="Shown on the card" label="Summary" showCount w="384">
      <Textarea maxLength={120} placeholder="Enter a summary..." />
    </Field>
  );
}
