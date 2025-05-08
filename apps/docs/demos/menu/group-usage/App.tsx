"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";

const groups = {
  display: {
    label: "Publishing Options",
  },
  divider: {
    hidden: true,
    label: "Blank",
    separator: true,
  },
} satisfies Record<string, MenuOption["group"]>;

const options: MenuOption[] = [
  {
    group: groups.display,
    label: "Save to Library",
    selected: true,
  },
  {
    group: groups.display,
    label: "Overwrite Existing",
  },
  {
    group: groups.divider,
    label: "Copy Link",
  },
];

export function App() {
  return (
    <Menu options={options}>
      <MenuTrigger>Settings</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
