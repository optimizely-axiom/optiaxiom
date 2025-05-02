"use client";

import { Field } from "@optiaxiom/react";
import { DateInput } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Field label="Start date" required w="224">
      <DateInput required />
    </Field>
  );
}
