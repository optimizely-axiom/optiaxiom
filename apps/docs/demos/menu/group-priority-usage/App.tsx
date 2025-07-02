"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";

const groups = {
  delete: {
    hidden: true,
    label: "Delete",
    priority: -100,
    separator: true,
  },
  edit: {
    hidden: true,
    label: "Edit",
    separator: true,
  },
} satisfies Record<string, MenuOption["group"]>;

export function App() {
  return (
    <Menu
      options={[
        {
          group: groups.delete,
          intent: "danger",
          label: "Delete",
        },
        {
          group: groups.edit,
          label: "View",
        },
        {
          group: groups.edit,
          label: "Download",
        },
      ]}
    >
      <MenuTrigger>Settings</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
