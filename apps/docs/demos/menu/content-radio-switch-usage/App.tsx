"use client";

import { IconBolt, IconUser } from "@optiaxiom/icons";
import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Menu
      options={[
        {
          addon: <IconUser />,
          label: "My Profile",
        },
        {
          addon: <IconBolt />,
          execute: () => setEnabled(!enabled),
          label: "New UI (Beta)",
          selected: enabled,
          switch: true,
        },
      ]}
    >
      <MenuTrigger>Settings</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
