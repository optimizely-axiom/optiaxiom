import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { DropdownMenuAutocompleteItem } from "../dropdown-menu-autocomplete-item";
import { ListboxVirtualized } from "../listbox-virtualized";
import { Spinner } from "../spinner";

type DropdownMenuAutocompleteListboxProps = BoxProps<
  typeof CommandListbox,
  {
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
  } & (
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: (item: any) => ReactNode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items?: any[];
      }
    | {
        children?: ReactNode;
        items?: never;
      }
  )
>;

export const DropdownMenuComboboxListbox = forwardRef<
  HTMLDivElement,
  DropdownMenuAutocompleteListboxProps
>(({ children, items: itemsProp, loading, ...props }, ref) => {
  const { highlightedItem, items, itemToLabel } = useCommandContext(
    "@optiaxiom/react/DropdownMenuComboboxListbox",
  );

  return (
    <CommandListbox
      asChild={!loading && typeof children === "function"}
      ref={ref}
      {...props}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" p="16">
          <Spinner />
        </Box>
      ) : children ? (
        typeof children === "function" ? (
          <ListboxVirtualized
            highlightedItem={highlightedItem}
            items={itemsProp ?? items}
          >
            {children}
          </ListboxVirtualized>
        ) : (
          children
        )
      ) : (
        items.map((item) => (
          <DropdownMenuAutocompleteItem item={item} key={item}>
            {itemToLabel(item)}
          </DropdownMenuAutocompleteItem>
        ))
      )}
    </CommandListbox>
  );
});

DropdownMenuComboboxListbox.displayName =
  "@optiaxiom/react/DropdownMenuComboboxListbox";
