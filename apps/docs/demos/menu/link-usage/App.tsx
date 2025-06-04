import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";

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
