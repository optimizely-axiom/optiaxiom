import { forwardRef, Fragment, type ReactNode, useEffect } from "react";

import { Box, type BoxProps } from "../box";
import { type CommandOption, useCommandContext } from "../command-context";
import { Listbox } from "../listbox";
import { ListboxEmpty } from "../listbox-empty";
import { ListboxVirtualized } from "../listbox-virtualized";
import { Spinner } from "../spinner";

const VIRTUALIZE_THRESHOLD = 50;

type CommandListboxProps = BoxProps<
  "div",
  {
    children?: ((item: CommandOption) => ReactNode) | ReactNode;
    /**
     * Custom empty state content.
     */
    empty?: ReactNode;
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
  }
>;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, empty = "No results found.", loading, size, ...props }, ref) => {
    const { downshift, highlightedItem, items, placed, setPlaced } =
      useCommandContext("@optiaxiom/react/CommandListbox");
    useEffect(() => {
      requestAnimationFrame(() => setPlaced(true));
      return () => setPlaced(false);
    }, [setPlaced]);

    return (
      <Listbox
        asChild={
          typeof children === "function" &&
          items.length > VIRTUALIZE_THRESHOLD &&
          placed
        }
        size={size}
        {...downshift.getMenuProps({ ref, ...props })}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" p="16">
            <Spinner />
          </Box>
        ) : typeof children === "function" ? (
          items.length > VIRTUALIZE_THRESHOLD ? (
            placed && (
              <ListboxVirtualized
                highlightedItem={highlightedItem}
                items={items}
              >
                {children}
              </ListboxVirtualized>
            )
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <Fragment key={index}>{children(item)}</Fragment>
            ))
          ) : (
            <ListboxEmpty>{empty}</ListboxEmpty>
          )
        ) : items.length > 0 ? (
          children
        ) : (
          <ListboxEmpty>{empty}</ListboxEmpty>
        )}
      </Listbox>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
