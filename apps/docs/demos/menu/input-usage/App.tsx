"use client";

import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

const colors = [
  { label: "Ocean" },
  { label: "Blue" },
  { label: "Purple" },
  { label: "Red" },
  { label: "Orange" },
  { label: "Yellow" },
];

export function App() {
  return (
    <Menu inputVisible="always" options={colors}>
      <MenuTrigger>Select color</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
