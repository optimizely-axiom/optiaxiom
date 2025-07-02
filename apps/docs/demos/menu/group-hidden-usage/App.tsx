"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";

const groups = {
  display: {
    hidden: true,
    label: "Publishing Options",
    separator: true,
  },
} satisfies Record<string, MenuOption["group"]>;

export function App() {
  return (
    <Menu
      options={[
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
          label: "Copy Link",
        },
      ]}
    >
      <MenuTrigger>Settings</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
