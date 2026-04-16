"use client";

import {
  IconAdd2,
  IconBook,
  IconLink,
  IconUpload,
  IconWandShine,
} from "@optiaxiom/icons";
import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react";

const options: MenuOption[] = [
  {
    addon: <IconUpload />,
    label: "Select from…",
    subOptions: [
      {
        addon: <IconUpload />,
        label: "Your device",
      },
      {
        addon: <IconBook />,
        label: "Library",
      },
    ],
  },
  {
    addon: <IconLink />,
    label: "Add URL",
  },
  {
    addon: <IconWandShine />,
    label: "Generate",
  },
];

export function App() {
  return (
    <Menu options={options}>
      <MenuTrigger icon={<IconAdd2 />} iconPosition="start">
        Add Content
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
