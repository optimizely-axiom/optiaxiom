import { CommandLoading } from "cmdk";
import { useCallback, useRef, useState } from "react";

import { Box } from "../box";
import { Combobox } from "../combobox";
import { Command } from "../command";
import { CommandEmpty } from "../command-empty";
import { CommandGroup } from "../command-group";
import { CommandInput } from "../command-input";
import { CommandItem } from "../command-item";
import { CommandList } from "../command-list";
import * as styles from "./Autocomplete.css";

// import { PopoverContent } from "../popover-content";
// import { PopoverTrigger } from "../popover-trigger";
import { Search } from "../search";
// import { Search } from "../search";
import { Skeleton } from "../skeleton";
import { Transition } from "../transition";

export type Option = Record<"label" | "value", string> & Record<string, string>;

type AutoCompleteProps = {
  disabled?: boolean;
  emptyMessage: string;
  isLoading?: boolean;
  onValueChange?: (value: Option) => void;
  options: Option[];
  placeholder?: string;
  value?: Option;
};

export const Autocomplete = ({
  disabled,
  emptyMessage,
  isLoading = false,
  onValueChange,
  options,
  placeholder,
  value,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || "");

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange],
  );

  return (
    <Combobox>
      <Command onKeyDown={handleKeyDown}>
        <CommandInput
          asChild
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          onValueChange={isLoading ? undefined : setInputValue}
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
        >
          <Search />
        </CommandInput>
        <Transition duration="lg" type="fade">
          <Box {...styles.listBox()}>
            <Box {...styles.animatedElement({ open: isOpen })}>
              <CommandList {...styles.list()}>
                {isLoading ? (
                  <CommandLoading>
                    <Skeleton />
                  </CommandLoading>
                ) : null}
                {options.length > 0 && !isLoading ? (
                  <CommandGroup>
                    {options.map((option) => {
                      return (
                        <CommandItem
                          key={option.value}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => handleSelectOption(option)}
                          value={option.label}
                        >
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                ) : null}
                {!isLoading ? (
                  <CommandEmpty {...styles.empty()}>
                    {emptyMessage}
                  </CommandEmpty>
                ) : null}
              </CommandList>
            </Box>
          </Box>
        </Transition>
      </Command>
    </Combobox>
  );
};

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
