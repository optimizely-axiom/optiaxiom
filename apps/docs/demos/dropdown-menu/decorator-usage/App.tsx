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
          endDecorator={
            <Kbd keys={["option", "shift"]} variant="subtle">
              P
            </Kbd>
          }
          startDecorator={<IconSettings />}
        >
          Preferences
        </DropdownMenuItem>
        <DropdownMenuItem startDecorator={<IconUser />}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          endDecorator={
            <Kbd keys={["option", "shift"]} variant="subtle">
              Q
            </Kbd>
          }
          startDecorator={<IconLogout />}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
