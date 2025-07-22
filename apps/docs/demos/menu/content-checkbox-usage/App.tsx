"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react";
import { useMemo, useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [value, setValue] = useState<string[]>([]);

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
            selected: value.includes(color),
          })),
        [value],
      )}
    >
      <MenuTrigger w="224">
        {value.length ? `${value.length} selected` : "Select color"}
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
