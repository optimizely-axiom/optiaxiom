import type { ComponentPropsWithRef } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";

export function App({
  align,
  side,
}: Pick<ComponentPropsWithRef<typeof DropdownMenuContent>, "align" | "side">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent align={align} side={side}>
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
