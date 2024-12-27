import { Box } from "@optiaxiom/react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteRadioItem,
  AutocompleteTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { colors } from "./data";

export function App() {
  const [items, setItems] = useState(colors);

  return (
    <Autocomplete
      isItemDisabled={(item) => Boolean(item.isDisabled)}
      items={items}
      itemToKey={(item) => item?.value}
      itemToString={(item) => (item ? item.label : "")}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) =>
                new RegExp(inputValue, "i").test(color.label),
              )
            : colors,
        );
      }}
    >
      <AutocompleteTrigger placeholder="Search a color..." w="224" />

      <AutocompleteContent>
        {items.map((item) => (
          <AutocompleteRadioItem
            icon={
              <Box
                rounded="sm"
                style={{ aspectRatio: 1, backgroundColor: item.color }}
              />
            }
            item={item}
            key={item.value}
          >
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
