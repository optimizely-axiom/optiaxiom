import React, { useState } from "react";

import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandGroup } from "../command-group";
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
  isLoading?: boolean;
  items: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  defaultValue = "",
  isLoading,
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
            // onClick={() => setOpen(true)}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => setOpen(e.key !== "Escape")}
            onValueChange={handleChange}
            value={value}
          >
            <Search placeholder={placeholder} />
          </CommandInput>
        </PopoverTrigger>
        {!open && <CommandList aria-hidden="true" display="none" />}
        <PopoverContent
          asChild
          onInteractOutside={(e: Event) => {
            if (
              e.target instanceof Element &&
              e.target.hasAttribute("cmdk-input")
            ) {
              e.preventDefault();
            }
          }}
          onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <CommandList>
            {items.length > 0 ? (
              <CommandGroup>
                {items.map((option) => (
                  <CommandItem
                    key={option}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={onSelectItem}
                    value={option}
                  >
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
            {!isLoading ? <CommandEmpty /> : null}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
};

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
