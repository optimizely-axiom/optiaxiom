import { useMemo, useState } from "react";

import { Combobox } from "../combobox";
import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandGroup } from "../command-group";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import { PopoverContent } from "../popover-content";
import { PopoverTrigger } from "../popover-trigger";
import { Search } from "../search";

export type Option = Record<"label" | "value", string> & Record<string, string>;

type AutoCompleteProps = {
  emptyMessage?: string;
  isLoading?: boolean;
  items: { label: string; value: string }[];
  onSearchValueChange: (value: string) => void;
  onSelectedValueChange: (value: string) => void;
  placeholder?: string;
  searchValue: string;
  selectedValue: string;
};

export const Autocomplete = ({
  emptyMessage = "No items.",
  isLoading,
  items,
  onSearchValueChange,
  onSelectedValueChange,
  placeholder = "Search...",
  searchValue,
  selectedValue,
}: AutoCompleteProps) => {
  const [open, setOpen] = useState(false);

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label;
          return acc;
        },
        {} as Record<string, string>,
      ),
    [items],
  );

  const reset = () => {
    onSelectedValueChange("");
    onSearchValueChange("");
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      labels[selectedValue] !== searchValue
    ) {
      reset();
    }
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
      setOpen(false);
    } else {
      onSelectedValueChange(inputValue);
      onSearchValueChange(labels[inputValue] ?? "");
      setOpen(false);
    }
  };

  return (
    <Combobox onOpenChange={setOpen} open={open}>
      <Command>
        <PopoverTrigger asChild>
          <CommandInput
            asChild
            onBlur={onInputBlur}
            // onFocus={() => setOpen(true)}
            onKeyDown={(e) => setOpen(e.key !== "Escape")}
            onMouseDown={() => setOpen((open) => !!searchValue || !open)}
            onValueChange={onSearchValueChange}
            value={searchValue}
          >
            <Search placeholder={placeholder} />
          </CommandInput>
        </PopoverTrigger>
        {!open && <CommandList aria-hidden="true" display="none" />}
        <PopoverContent
          asChild
          onInteractOutside={(e: PointerEvent) => {
            if (
              e.target instanceof Element &&
              e.target.hasAttribute("cmdk-input")
            ) {
              e.preventDefault();
            }
          }}
          onOpenAutoFocus={(e: PointerEvent) => e.preventDefault()}
        >
          <CommandList>
            {items.length > 0 && !isLoading ? (
              <CommandGroup>
                {items.map((option) => (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={onSelectItem}
                    value={option.value}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
            ) : null}
          </CommandList>
        </PopoverContent>
      </Command>
    </Combobox>
  );
};

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
