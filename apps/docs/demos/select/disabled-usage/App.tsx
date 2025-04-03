"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

const priorities = ["", "Urgent", "High", "Medium", "Low"];

export function App({
  disabled = true,
}: Pick<ComponentPropsWithoutRef<typeof Select>, "disabled">) {
  return (
    <Select
      disabled={disabled}
      items={priorities}
      itemToLabel={(item) => item || "No priority"}
    >
      <SelectTrigger placeholder="Set priority" w="224" />
      <SelectContent />
    </Select>
  );
}
