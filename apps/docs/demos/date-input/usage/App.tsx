"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field } from "@optiaxiom/react";
import { DateInput } from "@optiaxiom/react/unstable";

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
      <DateInput />
    </Field>
  );
}
