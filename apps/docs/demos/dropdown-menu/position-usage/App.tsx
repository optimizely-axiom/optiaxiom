"use client";

import type { ComponentPropsWithRef } from "react";

import { IconArrowRightFromBracket, IconUser } from "@optiaxiom/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@optiaxiom/react";

export function App({
  align,
  side,
}: Pick<ComponentPropsWithRef<typeof DropdownMenuContent>, "align" | "side">) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>

      <DropdownMenuContent align={align} side={side}>
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
