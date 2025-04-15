import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "../command-context";
import { IconAngleRight } from "../icons/IconAngleRight";
import { Text } from "../text";
import { decorateChildren } from "../utils";

type CommandItemProps = BoxProps<
  "div",
  {
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
  ({ asChild, children, item, selected, size, ...props }, ref) => {
    const { downshift, highlightedItem, inputValue, pauseInteractionRef } =
      useCommandContext("@optiaxiom/react/CommandItem");
    const itemProps = downshift.getItemProps({
      "aria-selected": selected ?? resolveItemProperty(item.selected),
      item,
      onClick: (event) => {
        if (event.currentTarget instanceof HTMLAnchorElement) {
          event.preventDefault();
        }
      },
      onMouseMove: (event) => {
        if (resolveItemProperty(item.disabledReason)) {
          event.preventDefault();
          Object.assign(event.nativeEvent, {
            preventDownshiftDefault: true,
          });
          return;
        }

        if (!pauseInteractionRef.current.triangle) {
          return;
        }

        if (
          isInsideTriangle(pauseInteractionRef.current.triangle, {
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
            pauseInteractionRef.current.triangle = null;
          }, 50);
        } else {
          pauseInteractionRef.current.triangle = null;
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
                {item.parentOption && (
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
                {detail && <Text color="fg.secondary">{detail}</Text>}
              </>
            ),
        )}
      </Box>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";

type Coords = { x: number; y: number };

function isInsideTriangle(
  {
    bottom,
    side,
    top,
  }: {
    bottom: Coords;
    side: Coords;
    top: Coords;
  },
  target: Coords,
) {
  const b0 =
      (top.x - side.x) * (bottom.y - side.y) -
      (bottom.x - side.x) * (top.y - side.y),
    b1 =
      ((top.x - target.x) * (bottom.y - target.y) -
        (bottom.x - target.x) * (top.y - target.y)) /
      b0,
    b2 =
      ((bottom.x - target.x) * (side.y - target.y) -
        (side.x - target.x) * (bottom.y - target.y)) /
      b0,
    b3 =
      ((side.x - target.x) * (top.y - target.y) -
        (top.x - target.x) * (side.y - target.y)) /
      b0;

  return b1 > 0 && b2 > 0 && b3 > 0;
}
