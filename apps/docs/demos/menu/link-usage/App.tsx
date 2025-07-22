import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";

export function App() {
  return (
    <Menu
      options={[
        {
          href: "../../",
          label: "Home",
        },
        {
          href: "../",
          label: "Components",
        },
      ]}
    >
      <MenuTrigger>Navigate to section</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
