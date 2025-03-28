import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import type { ExcludeProps, ExtendProps } from "../utils";

import { type BoxProps } from "../box";
import { Command } from "../command";
import { CommandListbox } from "../command-listbox";
import { DropdownMenuAutocompleteProvider } from "../dropdown-menu-autocomplete-context";
import { DropdownMenuAutocompleteInput } from "../dropdown-menu-autocomplete-input";
import { DropdownMenuAutocompleteScrollArea } from "../dropdown-menu-autocomplete-scroll-area";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { useCommandItems } from "../use-command-items";

type DropdownMenuAutocompleteProps = ExcludeProps<
  ExtendProps<BoxProps, ComponentPropsWithoutRef<typeof Command>>,
  "itemToSubItems"
>;

export const DropdownMenuAutocomplete = forwardRef<
  HTMLDivElement,
  DropdownMenuAutocompleteProps
>(
  (
    {
      children,
      defaultItems,
      inputValue: inputValueProp,
      isItemDisabled = () => false,
      isItemSelected = () => false,
      items: itemsProp,
      itemToLabel = (value) => (value ? String(value) : ""),
      onInputValueChange,
      onItemSelect,
      onMouseMove,
      ...props
    },
    outerRef,
  ) => {
    const { setOpen } = useDropdownMenuContext(
      "@optiaxiom/react/DropdownMenuAutocomplete",
    );
    const { open } = useDropdownMenuSubContext(
      "@optiaxiom/react/DropdownMenuAutocomplete",
    );

    const [items, inputValue, setInputValue] = useCommandItems({
      defaultItems,
      inputValue: inputValueProp,
      items: itemsProp,
      itemToLabel,
      onInputValueChange,
    });
    useEffect(() => {
      if (open) {
        setInputValue("");
      }
    }, [open, setInputValue]);

    const inputRef = useRef<HTMLInputElement>(null);

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useEffect(() => {
      const container = innerRef.current;
      if (!container) {
        return;
      }

      const listener = () => inputRef.current?.focus();
      container.addEventListener("focus", listener);
      return () => container.removeEventListener("focus", listener);
    }, []);

    return (
      <Command
        inputValue={inputValue}
        isItemDisabled={isItemDisabled}
        isItemSelected={isItemSelected}
        items={items}
        itemToLabel={itemToLabel}
        onInputValueChange={setInputValue}
        onItemSelect={(item) => {
          onItemSelect?.(item);
          setOpen(false);
        }}
      >
        <CommandListbox
          onMouseMove={(event) => {
            onMouseMove?.(event);
            inputRef.current?.focus();
          }}
          ref={ref}
          {...props}
        >
          <DropdownMenuAutocompleteProvider inputRef={inputRef}>
            {children ?? (
              <>
                <DropdownMenuAutocompleteInput placeholder="Search..." />
                <DropdownMenuAutocompleteScrollArea />
              </>
            )}
          </DropdownMenuAutocompleteProvider>
        </CommandListbox>
      </Command>
    );
  },
);

DropdownMenuAutocomplete.displayName =
  "@optiaxiom/react/DropdownMenuAutocomplete";
