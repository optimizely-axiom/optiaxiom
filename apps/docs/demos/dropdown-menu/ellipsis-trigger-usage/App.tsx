import { IconArrowRightFromBracket, IconUser } from "@optiaxiom/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EllipsisMenuButton,
} from "@optiaxiom/react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisMenuButton appearance="subtle" aria-label="My Account" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem icon={<IconUser />}>View Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<IconArrowRightFromBracket />}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
