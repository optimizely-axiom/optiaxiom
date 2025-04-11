import { forwardRef, Fragment, type ReactNode, useEffect } from "react";

import { Box, type BoxProps } from "../box";
import { Listbox } from "../listbox";
import { ListboxEmpty } from "../listbox-empty";
import { ListboxVirtualized } from "../listbox-virtualized";
import { Spinner } from "../spinner";
import { useEffectEvent } from "../use-event";

const VIRTUALIZE_THRESHOLD = 50;

type ListboxItemizedProps = BoxProps<
  "div",
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: ((item: any, index: number) => ReactNode) | ReactNode;
    /**
     * Custom empty state content.
     */
    empty?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    highlightedItem?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[] | readonly any[];
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: boolean;
    onPlacedChange?: (placed: boolean) => void;
    placed?: boolean;
  }
>;

export const ListboxItemized = forwardRef<HTMLDivElement, ListboxItemizedProps>(
  (
    {
      children,
      empty = "No results found.",
      highlightedItem,
      items,
      loading,
      onPlacedChange,
      placed,
      ...props
    },
    ref,
  ) => {
    const onPlacedChangeStable = useEffectEvent(onPlacedChange ?? (() => {}));
    useEffect(() => {
      onPlacedChangeStable(true);
      return () => onPlacedChangeStable(false);
    }, [onPlacedChangeStable]);

    return (
      <Listbox
        asChild={
          typeof children === "function" &&
          items.length > VIRTUALIZE_THRESHOLD &&
          placed
        }
        ref={ref}
        {...props}
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
              <Fragment key={index}>{children(item, index)}</Fragment>
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

ListboxItemized.displayName = "@optiaxiom/react/ListboxItemized";
