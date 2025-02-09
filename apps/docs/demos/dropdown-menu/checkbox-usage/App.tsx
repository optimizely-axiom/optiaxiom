"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [showStatus, setShowStatus] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Profile</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Display Options</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showStatus}
          onCheckedChange={setShowStatus}
        >
          Show Status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showNotification}
          onCheckedChange={setShowNotification}
        >
          Show Notifications
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
