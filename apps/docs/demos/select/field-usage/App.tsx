"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

const priorities = ["", "Urgent", "High", "Medium", "Low"];

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
      <Select items={priorities} itemToLabel={(item) => item || "No priority"}>
        <SelectTrigger placeholder="Set priority" w="224" />
        <SelectContent />
      </Select>
    </Field>
  );
}
