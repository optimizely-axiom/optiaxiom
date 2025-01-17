"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Switch,
} from "@optiaxiom/react";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [keepOpen, setKeepOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Flex flexDirection="row">
      <Switch onCheckedChange={setKeepOpen}>Keep menu open</Switch>

      <DropdownMenu
        modal={false}
        onOpenChange={(flag) => setOpen(flag || keepOpen)}
        open={open}
      >
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem icon={<IconUser />}>View Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<IconLogout />}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
}
