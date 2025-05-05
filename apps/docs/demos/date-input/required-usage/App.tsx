"use client";

import { DateInput, Field } from "@optiaxiom/react";

export function App() {
  return (
    <Field label="Start date" required w="224">
      <DateInput required />
    </Field>
  );
}
