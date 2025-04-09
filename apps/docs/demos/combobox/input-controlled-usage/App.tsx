"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

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
    <Combobox
      defaultInputVisible
      items={data}
      loading={isLoading}
      onInputValueChange={(inputValue) => refetch(inputValue)}
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
