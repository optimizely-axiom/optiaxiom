"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
  toaster,
} from "@optiaxiom/react";

const priorities = [
  { priority: "No priority", tasks: 3 },
  { priority: "Urgent", tasks: 0 },
  { priority: "High", tasks: 1 },
  { priority: "Medium", tasks: 0 },
  { priority: "Low", tasks: 0 },
];

export function App() {
  return (
    <Menu
      options={priorities.map<MenuOption>(({ priority, tasks }) => ({
        detail: tasks ? `${tasks} issue${tasks === 1 ? "" : "s"}` : undefined,
        execute: () => toaster.create(`Selected ${priority}`),
        label: priority,
      }))}
    >
      <MenuTrigger>Filter</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
