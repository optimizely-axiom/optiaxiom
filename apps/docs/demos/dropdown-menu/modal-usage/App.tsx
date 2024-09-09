import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";

export function App() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem startDecorator={<IconUser />}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem startDecorator={<IconLogout />}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
