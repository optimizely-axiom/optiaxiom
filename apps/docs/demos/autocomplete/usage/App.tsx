import { Box } from "@optiaxiom/react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmptyItem,
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
          {(item: (typeof items)[number]) => (
            <AutocompleteItem
              addonAfter={<AutocompleteItemIndicator />}
              addonBefore={
                <Box
                  rounded="sm"
                  style={{ aspectRatio: 1, backgroundColor: item.color }}
                />
              }
            >
              {item.label}
            </AutocompleteItem>
          )}
        </AutocompleteList>
        <AutocompleteEmptyItem>No result found</AutocompleteEmptyItem>
      </AutocompleteContent>
    </Autocomplete>
  );
}
