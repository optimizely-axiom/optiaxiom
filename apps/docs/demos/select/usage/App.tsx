"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

import { colors } from "./data";

export function App() {
  return (
    <Select items={colors}>
      <SelectTrigger placeholder="Select a color..." w="224" />
      <SelectContent />
    </Select>
  );
}
