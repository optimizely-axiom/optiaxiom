import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { ComboboxEmpty } from "../combobox-empty";
import { ComboboxRadioItem } from "../combobox-radio-item";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { ListboxVirtualized } from "../listbox-virtualized";
import { Spinner } from "../spinner";

type ComboboxListboxProps = BoxProps<
  typeof CommandListbox,
  {
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
  } & (
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: ((item: any) => ReactNode) | ReactNode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items?: any[];
      }
    | {
        children?: ReactNode;
        items?: never;
      }
  )
>;

export const ComboboxListbox = forwardRef<HTMLDivElement, ComboboxListboxProps>(
  ({ children, items: itemsProp, loading, ...props }, ref) => {
    const { highlightedItem, items, itemToLabel } = useCommandContext(
      "@optiaxiom/react/ComboboxListbox",
    );

    return (
      <CommandListbox
        asChild={!loading && typeof children === "function"}
        ref={ref}
        tabIndex={-1}
        {...props}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" p="16">
            <Spinner />
          </Box>
        ) : children ? (
          typeof children === "function" ? (
            items.length > 0 ? (
              <ListboxVirtualized
                highlightedItem={highlightedItem}
                items={itemsProp ?? items}
              >
                {children}
              </ListboxVirtualized>
            ) : (
              <ComboboxEmpty />
            )
          ) : (
            children
          )
        ) : items.length > 0 ? (
          items.map((item, index) => (
            <ComboboxRadioItem
              item={item}
              key={typeof item === "string" ? item : index}
            >
              {itemToLabel(item)}
            </ComboboxRadioItem>
          ))
        ) : (
          <ComboboxEmpty />
        )}
      </CommandListbox>
    );
  },
);

ComboboxListbox.displayName = "@optiaxiom/react/ComboboxListbox";
