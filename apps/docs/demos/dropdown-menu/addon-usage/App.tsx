import {
  IconArrowRightFromBracket,
  IconGear,
  IconUser,
} from "@optiaxiom/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Kbd,
} from "@optiaxiom/react";

export function App() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem
          addonAfter={
            <Kbd modifiers={["alt", "shift"]} variant="subtle">
              P
            </Kbd>
          }
          icon={<IconGear />}
        >
          Preferences
        </DropdownMenuItem>
        <DropdownMenuItem icon={<IconUser />}>View Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          addonAfter={
            <Kbd modifiers={["alt", "shift"]} variant="subtle">
              Q
            </Kbd>
          }
          icon={<IconArrowRightFromBracket />}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
