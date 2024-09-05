import React, { useState } from "react";

import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import { Popover } from "../popover";
import { PopoverContent } from "../popover-content";
import { PopoverTrigger } from "../popover-trigger";
import { Search } from "../search";

type AutocompleteProps = {
  defaultValue?: string;
  emptyMessage?: string;
  items: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  defaultValue = "",
  emptyMessage = "No items found.",
  items = [],
  onChange,
  placeholder = "Search...",
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes((value || "").toLowerCase()),
  );

  const onSelectItem = (selectedItem: string) => {
    if (selectedItem === value) {
      setOpen(false);
    } else {
      handleChange(selectedItem);
      setOpen(false);
    }
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <Command>
        <PopoverTrigger asChild>
          <CommandInput
            asChild
            onFocus={() => setOpen(true)}
            onValueChange={handleChange}
            value={value || ""}
          >
            <Search placeholder={placeholder} />
          </CommandInput>
        </PopoverTrigger>
        {!open && <CommandList aria-hidden="true" display="none" />}
        <PopoverContent
          asChild
          onInteractOutside={(e: Event) => {
            e.preventDefault();
          }}
          // onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <CommandList>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <CommandItem
                  key={item}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => onSelectItem(item)}
                  value={item}
                >
                  {item}
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
};

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
