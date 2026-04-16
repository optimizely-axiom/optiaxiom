"use client";

import { IconPerson, IconWandShine } from "@optiaxiom/icons";
import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Menu
      options={[
        {
          addon: <IconPerson />,
          label: "My Profile",
        },
        {
          addon: <IconWandShine />,
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
