"use client";

import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react";
import { IconSparkles, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Menu
      options={[
        {
          addon: <IconUser size="16" />,
          label: "My Profile",
        },
        {
          addon: <IconSparkles size="16" />,
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
