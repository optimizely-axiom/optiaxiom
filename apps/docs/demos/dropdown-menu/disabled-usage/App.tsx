import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconUser, IconUsers } from "@tabler/icons-react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem addonBefore={<IconUser />}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem addonBefore={<IconUsers />} disabled>
          Team Management
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem addonBefore={<IconLogout />}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
