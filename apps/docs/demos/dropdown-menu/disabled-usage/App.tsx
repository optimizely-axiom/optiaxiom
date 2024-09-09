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
        <DropdownMenuItem startDecorator={<IconUser />}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem disabled startDecorator={<IconUsers />}>
          Team Management
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem startDecorator={<IconLogout />}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
