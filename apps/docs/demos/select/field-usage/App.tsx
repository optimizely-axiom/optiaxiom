"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

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
      <Select
        options={[
          { label: "No priority", value: "" },
          { label: "Urgent", value: "Urgent" },
          { label: "High", value: "High" },
          { label: "Medium", value: "Medium" },
          { label: "Low", value: "Low" },
        ]}
      >
        <SelectTrigger placeholder="Set priority" w="224" />
        <SelectContent />
      </Select>
    </Field>
  );
}
