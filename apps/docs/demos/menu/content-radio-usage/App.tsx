"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [value, setValue] = useState<(typeof colors)[number]>();

  return (
    <Menu
      options={useMemo(
        () =>
          colors.map<MenuOption>((color) => ({
            execute: () => setValue((value) => (value === color ? "" : color)),
            label: color,
            selected: value === color,
          })),
        [value],
      )}
    >
      <MenuTrigger w="224">{value || "Select color"}</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
