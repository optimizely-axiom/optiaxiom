"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field, Radio, RadioGroup } from "@optiaxiom/react";

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
      <RadioGroup name="usage">
        <Radio value="one">Option One</Radio>
        <Radio value="two">Option Two</Radio>
        <Radio value="three">Option Three</Radio>
      </RadioGroup>
    </Field>
  );
}
