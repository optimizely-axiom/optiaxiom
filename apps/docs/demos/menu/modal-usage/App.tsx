import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Menu modal={false}>
      <MenuTrigger>Open</MenuTrigger>

      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem startDecorator={<IconUser />}>View Profile</MenuItem>
        <MenuSeparator />
        <MenuItem startDecorator={<IconLogout />}>Logout</MenuItem>
      </MenuContent>
    </Menu>
  );
}
