import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, type MouseEvent } from "react";

import { Box, type BoxProps } from "../box";
import { IconAngleRight } from "../icons/IconAngleRight";
import { Text } from "../text";
import { decorateChildren } from "../utils";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "./CommandContext";

export type CommandItemProps = BoxProps<
  "div",
  {
    /**
     * The index of the item object within the collection.
     */
    index: number;
    /**
     * The exact item object from the collection.
     */
    item: CommandOption;
    /**
     * Whether to override the default selected state.
     */
    selected?: boolean;
  }
>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  (
    {
      asChild,
      children,
      index,
      item,
      onClick,
      onMouseLeave,
      onMouseMove,
      selected,
      size,
      ...props
    },
    outerRef,
  ) => {
    const {
      downshift,
      enabled,
      highlightedItem,
      highlightedItemRef,
      inputValue,
      items,
      pauseInteractionRef,
    } = useCommandContext("@optiaxiom/react/CommandItem");
    const ref = useComposedRefs(
      highlightedItem === item ? highlightedItemRef : undefined,
      outerRef,
    );

    const itemProps = downshift.getItemProps({
      "aria-posinset": index + 1,
      "aria-selected": selected ?? resolveItemProperty(item.selected),
      "aria-setsize": items.length,
      item,
      onClick: (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        if (event.currentTarget instanceof HTMLAnchorElement) {
          if (event.altKey || event.metaKey || event.shiftKey) {
            Object.assign(event, {
              preventDownshiftDefault: true,
            });
          } else {
            /**
             * Skip following the link if a custom execute handler is attached
             */
            if (item.execute) {
              event.preventDefault();
            }
          }
        }
      },
      onMouseLeave: (event: MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(event);
        window.clearTimeout(pauseInteractionRef.current.timer);
      },
      onMouseMove: (event: MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(event);
        if (event.defaultPrevented) {
          return;
        }

        /**
         * Downshift listens to mousemove on items for highlighting and
         * scrolling.
         *
         * For disabled items we don't want this as downshift will try to reset
         * highlightedIndex to -1 when mousing over them.
         *
         * We also use exit animations where downshift menu will be present in
         * DOM while closing - and we need to prevent triggering mousemove
         * during that time.
         */
        if (!enabled || resolveItemProperty(item.disabledReason)) {
          event.preventDefault();
          Object.assign(event.nativeEvent, {
            preventDownshiftDefault: true,
          });
          return;
        }

        if (!pauseInteractionRef.current.isInsideTriangle) {
          return;
        }

        if (
          pauseInteractionRef.current.isInsideTriangle({
            x: event.clientX,
            y: event.clientY,
          })
        ) {
          event.preventDefault();
          Object.assign(event.nativeEvent, {
            preventDownshiftDefault: true,
          });

          window.clearTimeout(pauseInteractionRef.current.timer);
          pauseInteractionRef.current.timer = window.setTimeout(() => {
            pauseInteractionRef.current.isInsideTriangle = null;
            downshift.setHighlightedIndex(index);
          }, 20);
        } else {
          pauseInteractionRef.current.isInsideTriangle = null;
        }
      },
      ref,
      ...props,
    });
    const detail = resolveItemProperty(item.detail, { inputValue });

    return (
      <Box
        asChild={asChild}
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        size={size}
        tabIndex={-1}
        {...itemProps}
        {...(item.href && { href: item.href })}
      >
        {decorateChildren(
          { asChild, children },
          (children) =>
            children ?? (
              <>
                {item.parentOption &&
                  !item.parentOption.hiddenInSearchContext && (
                    <>
                      <Text color="fg.secondary">
                        {resolveItemProperty(item.parentOption.label, {
                          inputValue,
                        })}
                      </Text>
                      <Box asChild h="10" w="auto">
                        <IconAngleRight />
                      </Box>
                    </>
                  )}
                {resolveItemProperty(item.label, { inputValue })}
                {detail && (
                  <Text color="fg.secondary" flex="1">
                    {detail}
                  </Text>
                )}
              </>
            ),
        )}
      </Box>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
