import { Box } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  ComboboxValue,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { colors } from "./data";

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState([colors[3]]);

  return (
    <Combobox
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
      onItemSelect={(value) =>
        setValue((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        )
      }
      value={value}
    >
      <ComboboxTrigger w="160">
        <ComboboxValue placeholder="Select colors..." />
      </ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxListbox>
          {items.map((item) => (
            <ComboboxCheckboxItem
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
            </ComboboxCheckboxItem>
          ))}

          {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}