import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteRadioItem,
  AutocompleteTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { type Color, colors } from "./data";

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<Color | null>(colors[1]);

  return (
    <Autocomplete
      items={items}
      itemToString={(item) => item?.label || ""}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) =>
                new RegExp(inputValue, "i").test(color.label),
              )
            : colors,
        );
      }}
      onValueChange={setValue}
      value={value}
    >
      <AutocompleteTrigger placeholder="Search a color..." w="224" />

      <AutocompleteContent>
        {items.map((item) => (
          <AutocompleteRadioItem item={item} key={item.label}>
            {item.label}
          </AutocompleteRadioItem>
        ))}

        {items.length === 0 && (
          <AutocompleteEmpty>No result found</AutocompleteEmpty>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
