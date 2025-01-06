import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteRadioItem,
  AutocompleteTrigger,
  AutocompleteVirtualized,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const colors = Array.from({ length: 2000 }).map(
  (_, index) => `Color ${index + 1}`,
);

export function App() {
  const [items, setItems] = useState(colors);

  return (
    <Autocomplete
      items={items}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) => new RegExp(inputValue, "i").test(color))
            : colors,
        );
      }}
    >
      <AutocompleteTrigger placeholder="Search a color..." w="224" />

      <AutocompleteContent>
        <AutocompleteVirtualized items={items}>
          {(item) => (
            <AutocompleteRadioItem item={item} key={item}>
              {item}
            </AutocompleteRadioItem>
          )}
        </AutocompleteVirtualized>

        {items.length === 0 && (
          <AutocompleteEmpty>No result found</AutocompleteEmpty>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
