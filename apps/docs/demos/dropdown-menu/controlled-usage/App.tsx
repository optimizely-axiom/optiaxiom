"use client";

import { IconLogout, IconPerson } from "@optiaxiom/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Group,
  Switch,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [keepOpen, setKeepOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Group gap="16">
      <Switch onCheckedChange={setKeepOpen}>Keep menu open</Switch>
      <DropdownMenu
        modal={false}
        onOpenChange={(flag) => setOpen(flag || keepOpen)}
        open={open}
      >
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem icon={<IconPerson />}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<IconLogout />}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Group>
  );
}
