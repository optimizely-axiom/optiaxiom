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
    <Menu>
      <MenuTrigger>Open</MenuTrigger>

      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem startDecorator={<IconUser size="16" />}>
          View Profile
        </MenuItem>
        <MenuSeparator />
        <MenuItem startDecorator={<IconLogout size="16" />}>Logout</MenuItem>
      </MenuContent>
    </Menu>
  );
}
