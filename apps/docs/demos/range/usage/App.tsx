"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field } from "@optiaxiom/react";
import { Range } from "@optiaxiom/react/unstable";

export function App({
  description,
  error,
  label = "Significance Level",
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
      w="384"
    >
      <Range
        defaultValue={95}
        getLabel={(value) => `${value}%`}
        marks={[85, 90, 95, 99]}
        max={99}
        min={85}
        showTooltip
      />
    </Field>
  );
}
