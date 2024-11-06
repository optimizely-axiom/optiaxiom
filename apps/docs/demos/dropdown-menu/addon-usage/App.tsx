import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Kbd,
} from "@optiaxiom/react";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem
          addonAfter={
            <Kbd keys={["option", "shift"]} variant="subtle">
              P
            </Kbd>
          }
          icon={<IconSettings />}
        >
          Preferences
        </DropdownMenuItem>
        <DropdownMenuItem icon={<IconUser />}>View Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          addonAfter={
            <Kbd keys={["option", "shift"]} variant="subtle">
              Q
            </Kbd>
          }
          icon={<IconLogout />}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
