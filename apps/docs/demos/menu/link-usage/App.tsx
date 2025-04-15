"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const users = [
  {
    label: "Buckaroo Banzai",
    link: "https://www.imdb.com/title/tt0086856/",
  },
  { label: "Emilio Lizardo" },
  { label: "Perfect Tommy" },
] satisfies MenuOption[];

export function App() {
  const [value, setValue] = useState<(typeof users)[number]>();

  return (
    <Menu
      options={useMemo(
        () =>
          users.map<MenuOption>((user) => ({
            execute: () => setValue(user),
            selected: value === user,
            ...user,
          })),
        [value],
      )}
    >
      <MenuTrigger>Select assignee</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
