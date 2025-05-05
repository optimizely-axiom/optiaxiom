"use client";

import type { ComponentPropsWithoutRef } from "react";

import { DateInput, Field } from "@optiaxiom/react";

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
      w="224"
    >
      <DateInput />
    </Field>
  );
}
