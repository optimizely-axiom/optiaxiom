import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { DropdownMenuAutocompleteItem } from "../dropdown-menu-autocomplete-item";
import { Listbox } from "../listbox";
import { ListboxVirtualized } from "../listbox-virtualized";
import { Spinner } from "../spinner";

type DropdownMenuAutocompleteScrollAreaProps = BoxProps<
  typeof Listbox,
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

export const DropdownMenuAutocompleteScrollArea = forwardRef<
  HTMLDivElement,
  DropdownMenuAutocompleteScrollAreaProps
>(({ children, items: itemsProp, loading, ...props }, ref) => {
  const { highlightedItem, items, itemToLabel } = useCommandContext(
    "@optiaxiom/react/DropdownMenuAutocompleteScrollArea",
  );

  return (
    <Listbox
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
    </Listbox>
  );
});

DropdownMenuAutocompleteScrollArea.displayName =
  "@optiaxiom/react/DropdownMenuAutocompleteScrollArea";
