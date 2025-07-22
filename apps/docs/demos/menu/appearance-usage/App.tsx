import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

export function App() {
  return (
    <Menu
      options={[
        { description: "Create a new task", label: "New task" },
        { description: "Copy this task", label: "Copy task" },
        {
          group: { hidden: true, label: "Delete", separator: true },
          intent: "danger",
          label: "Delete task",
        },
      ]}
    >
      <MenuTrigger>Actions</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
