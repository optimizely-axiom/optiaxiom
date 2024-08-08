import {
  Kbd,
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>

      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuItem
          endDecorator={
            <Kbd keys={["option", "shift"]} variant="subtle">
              P
            </Kbd>
          }
          startDecorator={<IconSettings />}
        >
          Preferences
        </MenuItem>
        <MenuItem startDecorator={<IconUser />}>View Profile</MenuItem>
        <MenuSeparator />
        <MenuItem
          endDecorator={
            <Kbd keys={["option", "shift"]} variant="subtle">
              Q
            </Kbd>
          }
          startDecorator={<IconLogout />}
        >
          Logout
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
