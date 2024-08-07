import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@optiaxiom/react";
import { IconDots, IconLogout, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Menu>
      <MenuTrigger
        appearance="secondary"
        aria-label="My Account"
        icon={<IconDots />}
      />

      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem startDecorator={<IconUser />}>View Profile</MenuItem>
        <MenuSeparator />
        <MenuItem startDecorator={<IconLogout />}>Logout</MenuItem>
      </MenuContent>
    </Menu>
  );
}
