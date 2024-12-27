import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteRadioItem,
  AutocompleteTrigger,
} from "@optiaxiom/react/unstable";
import { useEffect, useState } from "react";

import { colors } from "./data";

export function App() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const filteredItems = inputValue
    ? items.filter((color) => new RegExp(inputValue, "i").test(color))
    : items;

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setItems(open ? colors : []), 3000);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Autocomplete
      items={filteredItems}
      onInputValueChange={setInputValue}
      onOpenChange={setOpen}
      open={open}
    >
      <AutocompleteTrigger placeholder="Search a color..." w="224" />

      <AutocompleteContent loading={items.length === 0}>
        {filteredItems.map((item) => (
          <AutocompleteRadioItem item={item} key={item}>
            {item}
          </AutocompleteRadioItem>
        ))}

        {filteredItems.length === 0 && (
          <AutocompleteEmpty>No result found</AutocompleteEmpty>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
