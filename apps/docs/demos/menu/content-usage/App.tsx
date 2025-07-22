"use client";

import {
  Flex,
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import { useMemo, useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <Menu
        options={useMemo(
          () =>
            colors.map<MenuOption>((color) => ({
              execute: () => setValue(color),
              label: color,
            })),
          [],
        )}
      >
        <MenuTrigger>Select color</MenuTrigger>
        <MenuContent />
      </Menu>
      <Text fontSize="md">Selected: {value}</Text>
    </Flex>
  );
}
