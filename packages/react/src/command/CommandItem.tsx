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
    ref,
  ) => {
    const {
      downshift,
      highlightedItem,
      inputValue,
      items,
      pauseInteractionRef,
    } = useCommandContext("@optiaxiom/react/CommandItem");

    const itemProps = downshift.getItemProps({
      "aria-posinset": index + 1,
      "aria-selected": selected ?? resolveItemProperty(item.selected),
      "aria-setsize": items.length,
      item,
      onClick: (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        if (event.currentTarget instanceof HTMLAnchorElement) {
          event.preventDefault();
        }
      },
      onMouseLeave: (event: MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(event);
        window.clearTimeout(pauseInteractionRef.current.timer);
      },
      onMouseMove: (event: MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(event);
        if (resolveItemProperty(item.disabledReason)) {
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
        {...(item.link && { href: item.link })}
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
