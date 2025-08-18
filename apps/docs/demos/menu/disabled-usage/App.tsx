import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

export function App() {
  return (
    <Menu
      options={[
        { label: "Edit" },
        {
          disabledReason: "Public link will be available when published",
          label: "Copy public link",
        },
        { label: "Download" },
      ]}
    >
      <MenuTrigger>Actions</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
