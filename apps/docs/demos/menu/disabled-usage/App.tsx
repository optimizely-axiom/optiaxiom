import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconUser, IconUsers } from "@tabler/icons-react";

export function App() {
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>

      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem startDecorator={<IconUser />}>View Profile</MenuItem>
        <MenuItem disabled startDecorator={<IconUsers />}>
          Team Management
        </MenuItem>
        <MenuSeparator />
        <MenuItem startDecorator={<IconLogout />}>Logout</MenuItem>
      </MenuContent>
    </Menu>
  );
}
