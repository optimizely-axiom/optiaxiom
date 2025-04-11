"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

export function App({
  disabled = true,
}: Pick<ComponentPropsWithoutRef<typeof Select>, "disabled">) {
  return (
    <Select
      disabled={disabled}
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
  );
}
