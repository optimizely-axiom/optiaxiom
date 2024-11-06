import { Box } from "@optiaxiom/react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteItemIndicator,
  AutocompleteList,
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
          colors.filter(
            (color) =>
              !inputValue ||
              color.label.toLowerCase().includes(inputValue.toLowerCase()),
          ),
        );
      }}
    >
      <AutocompleteTrigger placeholder="Search a color..." w="240" />

      <AutocompleteContent>
        <AutocompleteList>
          {items.map((item) => (
            <AutocompleteItem
              addonAfter={<AutocompleteItemIndicator />}
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
            </AutocompleteItem>
          ))}
        </AutocompleteList>
        <AutocompleteEmpty>No result found</AutocompleteEmpty>
      </AutocompleteContent>
    </Autocomplete>
  );
}
