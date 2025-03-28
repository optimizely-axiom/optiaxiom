import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { ComboboxRadioItem } from "../combobox-radio-item";
import { useCommandContext } from "../command-context";
import { Listbox } from "../listbox";
import { ListboxVirtualized } from "../listbox-virtualized";
import { Spinner } from "../spinner";

type ComboboxScrollAreaProps = BoxProps<
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

export const ComboboxScrollArea = forwardRef<
  HTMLDivElement,
  ComboboxScrollAreaProps
>(({ children, items: itemsProp, loading, ...props }, ref) => {
  const { highlightedItem, items } = useCommandContext(
    "@optiaxiom/react/ComboboxScrollArea",
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
          <ComboboxRadioItem item={item} key={item}>
            {item}
          </ComboboxRadioItem>
        ))
      )}
    </Listbox>
  );
});

ComboboxScrollArea.displayName = "@optiaxiom/react/ComboboxScrollArea";
