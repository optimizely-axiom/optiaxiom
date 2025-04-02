import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { DropdownMenuAutocompleteItem } from "../dropdown-menu-autocomplete-item";
import { Spinner } from "../spinner";

type DropdownMenuAutocompleteListboxProps = BoxProps<
  typeof CommandListbox,
  {
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
  }
>;

export const DropdownMenuComboboxListbox = forwardRef<
  HTMLDivElement,
  DropdownMenuAutocompleteListboxProps
>(({ children, loading, ...props }, ref) => {
  const { items, itemToLabel } = useCommandContext(
    "@optiaxiom/react/DropdownMenuComboboxListbox",
  );

  return (
    <CommandListbox ref={ref} {...props}>
      {loading ? (
        <Box display="flex" justifyContent="center" p="16">
          <Spinner />
        </Box>
      ) : (
        (children ??
        items.map((item) => (
          <DropdownMenuAutocompleteItem item={item} key={item}>
            {itemToLabel(item)}
          </DropdownMenuAutocompleteItem>
        )))
      )}
    </CommandListbox>
  );
});

DropdownMenuComboboxListbox.displayName =
  "@optiaxiom/react/DropdownMenuComboboxListbox";
