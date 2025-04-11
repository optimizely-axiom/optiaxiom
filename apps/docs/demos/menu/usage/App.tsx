"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const priorities = ["No priority", "Urgent", "High", "Medium", "Low"];

export function App() {
  const [value, setValue] = useState<string>("No priority");

  return (
    <Menu
      options={useMemo(
        () =>
          priorities.map<MenuOption>((priority) => ({
            execute: () => setValue(priority),
            label: priority,
            selected: priority === value,
          })),
        [value],
      )}
    >
      <MenuTrigger w="224">
        {value !== "No priority" ? value : "Set priority"}
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
