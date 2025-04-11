"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const colors = Array.from({ length: 2000 }).map(
  (_, index) => `Color ${index + 1}`,
);

export function App() {
  const [value, setValue] = useState([colors[0]]);

  return (
    <Menu
      options={useMemo(
        () =>
          colors.map<MenuOption>((color) => ({
            execute: () =>
              setValue((value) =>
                value.includes(color)
                  ? value.filter((v) => v !== color)
                  : [...value, color],
              ),
            label: color,
            multi: true,
            selected: () => value.includes(color),
          })),
        [value],
      )}
    >
      <MenuTrigger w="224">Select colors</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
