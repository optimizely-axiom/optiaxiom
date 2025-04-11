import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";

const colors: MenuOption[] = [
  { label: "Ocean" },
  { label: "Blue" },
  { label: "Purple" },
  { label: "Red" },
  { label: "Orange" },
  { label: "Yellow" },
];

export function App() {
  return (
    <Menu options={colors}>
      <MenuTrigger>Select color</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
