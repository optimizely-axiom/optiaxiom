"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconBooks,
  IconLink,
  IconPlus,
  IconSparkles,
  IconUpload,
} from "@tabler/icons-react";

const options: MenuOption[] = [
  {
    addon: <IconUpload size={16} />,
    label: "Select from…",
    subOptions: [
      {
        addon: <IconUpload size={16} />,
        label: "Your device",
      },
      {
        addon: <IconBooks size={16} />,
        label: "Library",
      },
    ],
  },
  {
    addon: <IconLink size={16} />,
    label: "Add URL",
  },
  {
    addon: <IconSparkles size={16} />,
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
