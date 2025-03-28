import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { Command } from "../command";
import { useDropdownMenuComboboxContext } from "../dropdown-menu-combobox-context";
import { DropdownMenuComboboxInput } from "../dropdown-menu-combobox-input";
import { DropdownMenuComboboxListbox } from "../dropdown-menu-combobox-listbox";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { DropdownMenuSubContent } from "../dropdown-menu-sub-content";

type DropdownMenuComboboxContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuSubContent
>;

export const DropdownMenuComboboxContent = forwardRef<
  HTMLDivElement,
  DropdownMenuComboboxContentProps
>(({ children, onMouseMove, ...props }, outerRef) => {
  const { setOpen } = useDropdownMenuContext(
    "@optiaxiom/react/DropdownMenuComboboxContent",
  );
  const {
    inputRef,
    inputValue,
    isItemDisabled,
    isItemSelected,
    items,
    itemToLabel,
    onInputValueChange,
    onItemSelect,
  } = useDropdownMenuComboboxContext(
    "@optiaxiom/react/DropdownMenuComboboxContent",
  );

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
  }, [inputRef]);

  return (
    <Command
      inputValue={inputValue}
      isItemDisabled={isItemDisabled}
      isItemSelected={isItemSelected}
      items={items}
      itemToLabel={itemToLabel}
      onInputValueChange={onInputValueChange}
      onItemSelect={(item) => {
        onItemSelect?.(item);
        setOpen(false);
      }}
    >
      <DropdownMenuSubContent
        onMouseMove={(event) => {
          onMouseMove?.(event);
          inputRef.current?.focus();
        }}
        ref={ref}
        role="dialog"
        {...props}
      >
        {children ?? (
          <>
            <DropdownMenuComboboxInput placeholder="Search..." />
            <DropdownMenuComboboxListbox />
          </>
        )}
      </DropdownMenuSubContent>
    </Command>
  );
});

DropdownMenuComboboxContent.displayName =
  "@optiaxiom/react/DropdownMenuComboboxContent";
