"use client";

import {
  IconBolt,
  IconBook,
  IconLinkHorizontal,
  IconPlus,
  IconUpload,
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
    addon: <IconLinkHorizontal />,
    label: "Add URL",
  },
  {
    addon: <IconBolt />,
    label: "Generate",
  },
];

export function App() {
  return (
    <Menu options={options}>
      <MenuTrigger icon={<IconPlus />} iconPosition="start">
        Add Content
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
