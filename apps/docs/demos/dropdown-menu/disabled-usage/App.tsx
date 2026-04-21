import {
  IconArrowRightFromBracket,
  IconPeopleSimple,
  IconUser,
} from "@optiaxiom/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem icon={<IconUser />}>View Profile</DropdownMenuItem>
        <DropdownMenuItem disabled icon={<IconPeopleSimple />}>
          Team Management
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<IconArrowRightFromBracket />}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
