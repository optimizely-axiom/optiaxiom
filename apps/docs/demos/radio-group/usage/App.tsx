import type { ComponentPropsWithoutRef } from "react";

import { Field, RadioGroup, RadioGroupItem } from "@optiaxiom/react";

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
      <RadioGroup>
        <RadioGroupItem value="one">Option One</RadioGroupItem>
        <RadioGroupItem value="two">Option Two</RadioGroupItem>
        <RadioGroupItem value="three">Option Three</RadioGroupItem>
      </RadioGroup>
    </Field>
  );
}
