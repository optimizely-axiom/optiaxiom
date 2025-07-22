"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react";
import {
  IconBooks,
  IconLink,
  IconPlus,
  IconSparkles,
  IconUpload,
} from "@tabler/icons-react";

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
        addon: <IconBooks />,
        label: "Library",
      },
    ],
  },
  {
    addon: <IconLink />,
    label: "Add URL",
  },
  {
    addon: <IconSparkles />,
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
