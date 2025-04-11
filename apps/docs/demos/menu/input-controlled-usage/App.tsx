"use client";

import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";

import { useQuery } from "./useQuery";

const colors = [
  {
    label: "Ocean",
    visible: true,
  },
  {
    label: "Blue",
    visible: true,
  },
  {
    label: "Purple",
    visible: true,
  },
  {
    label: "Red",
    visible: true,
  },
  {
    label: "Orange",
    visible: true,
  },
  {
    label: "Yellow",
    visible: true,
  },
];

export function App() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery((inputValue: string) =>
    inputValue
      ? colors.filter((color) =>
          color.label.toLowerCase().startsWith(inputValue.toLowerCase()),
        )
      : colors,
  );

  return (
    <Menu
      defaultInputVisible
      loading={isLoading}
      onInputValueChange={(inputValue) => refetch(inputValue)}
      options={data}
    >
      <MenuTrigger w="224">Select colors</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
