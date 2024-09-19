import type { ComponentPropsWithoutRef } from "react";

import { Field, Textarea } from "@optiaxiom/react";

export function App({
  description,
  error,
  label = "Input label",
  required = false,
}: Pick<
  ComponentPropsWithoutRef<typeof Field>,
  "description" | "error" | "label" | "required"
>) {
  return (
    <Field
      description={description}
      error={error}
      label={label}
      required={required}
    >
      <Textarea placeholder="Enter text..." />
    </Field>
  );
}
