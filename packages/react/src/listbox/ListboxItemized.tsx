import { forwardRef, Fragment, type ReactNode, useEffect } from "react";

import { type BoxProps } from "../box";
import { useEffectEvent } from "../hooks";
import { Skeleton } from "../skeleton";
import { Listbox } from "./Listbox";
import { ListboxEmpty } from "./ListboxEmpty";
import { ListboxItem } from "./ListboxItem";
import { ListboxVirtualized } from "./ListboxVirtualized";

const VIRTUALIZE_THRESHOLD = 50;

export type ListboxItemizedProps = BoxProps<
  "div",
  {
    children?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((item: any, index: number, prevItem: any) => ReactNode) | ReactNode;
    /**
     * Custom empty state content.
     */
    empty?: ReactNode;
    /**
     * The currently highlighted item.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    highlightedItem?: any;
    /**
     * The collection of items to display.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[] | readonly any[];
    /**
     * Function to get the unique key for each item as a string.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemToKey: (item: any) => string;
    /**
     * Whether to show loading spinner inside the menu.
     */
    loading?: "both" | "placeholder" | "spinner";
    /**
     * Handler that is called when the element mounts or unmounts from the DOM.
     */
    onPlacedChange?: (placed: boolean) => void;
  }
>;

export const ListboxItemized = forwardRef<HTMLDivElement, ListboxItemizedProps>(
  (
    {
      children,
      empty = "No results found.",
      highlightedItem,
      items,
      itemToKey,
      loading,
      onPlacedChange,
      ...props
    },
    ref,
  ) => {
    const onPlacedChangeStable = useEffectEvent(onPlacedChange ?? (() => {}));
    useEffect(() => {
      /**
       * We wait for first paint to render the menu and then another paint for
       * radix popper to place the menu and set the max-height. Otherwise we
       * cannot scroll to the item because it isn't scrollable yet.
       */
      requestAnimationFrame(() =>
        requestAnimationFrame(() => onPlacedChangeStable(true)),
      );
      return () => onPlacedChangeStable(false);
    }, [onPlacedChangeStable]);

    return (
      <Listbox
        asChild={
          typeof children === "function" && items.length > VIRTUALIZE_THRESHOLD
        }
        ref={ref}
        tabIndex={-1}
        {...props}
      >
        {loading === "both" || loading === "placeholder" ? (
          <>
            {[1, 2, 3].map((item) => (
              <ListboxItem
                addonBefore={<Skeleton circle size="xs" />}
                aria-hidden
                key={item}
              >
                <Skeleton />
              </ListboxItem>
            ))}
          </>
        ) : typeof children === "function" ? (
          items.length > VIRTUALIZE_THRESHOLD ? (
            <ListboxVirtualized
              highlightedItem={highlightedItem}
              items={items}
              itemToKey={itemToKey}
            >
              {children}
            </ListboxVirtualized>
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <Fragment key={itemToKey(item)}>
                {children(item, index, items[index - 1])}
              </Fragment>
            ))
          ) : (
            loading !== "spinner" && <ListboxEmpty>{empty}</ListboxEmpty>
          )
        ) : items.length > 0 ? (
          children
        ) : (
          loading !== "spinner" && <ListboxEmpty>{empty}</ListboxEmpty>
        )}
      </Listbox>
    );
  },
);

ListboxItemized.displayName = "@optiaxiom/react/ListboxItemized";
