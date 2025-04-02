"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

import { useQuery } from "./useQuery";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const { data, isLoading, refetch } = useQuery((inputValue: string) =>
    inputValue
      ? colors.filter((color) =>
          color.toLowerCase().includes(inputValue.toLowerCase()),
        )
      : colors,
  );

  return (
    <Combobox
      items={data}
      onInputValueChange={(inputValue) => refetch(inputValue)}
    >
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxListbox loading={isLoading} />
      </ComboboxContent>
    </Combobox>
  );
}
