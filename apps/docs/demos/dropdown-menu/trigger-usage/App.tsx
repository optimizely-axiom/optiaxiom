import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { IconDots, IconLogout, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        appearance="subtle"
        aria-label="My Account"
        icon={<IconDots />}
      />

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem addonBefore={<IconUser />}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem addonBefore={<IconLogout />}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
