"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field, SearchInput } from "@optiaxiom/react";

export function App({
  description,
  error,
  label = "Search label",
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
      <SearchInput placeholder="Enter text..." w="224" />
    </Field>
  );
}
