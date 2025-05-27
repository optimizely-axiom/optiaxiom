import { PopperContent } from "@radix-ui/react-popper";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from "react";

import type { ExcludeProps } from "../utils";

import { type BoxProps } from "../box";
import { ListboxItemized, ListboxLabel, ListboxSeparator } from "../listbox";
import { shouldShowGroup, shouldShowSeparator } from "../listbox/utils";
import { ModalLayer } from "../modal";
import { ModalListbox } from "../modal/internals";
import { Portal } from "../portal";
import { Tooltip } from "../tooltip";
import { TransitionGroup } from "../transition";
import { type SelectOption, useSelectContext } from "./SelectContext";
import { SelectRadioItem } from "./SelectRadioItem";

export type SelectContentProps = ExcludeProps<
  BoxProps<
    typeof PopperContent,
    Pick<ComponentPropsWithoutRef<typeof ModalListbox>, "maxH" | "minW"> & {
      children?: ((item: SelectOption) => ReactNode) | ReactNode;
    }
  >,
  | "alignOffset"
  | "arrowPadding"
  | "avoidCollisions"
  | "collisionBoundary"
  | "collisionPadding"
  | "hideWhenDetached"
  | "onPlaced"
  | "sideOffset"
  | "sticky"
  | "updatePositionStrategy"
>;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      align = "start",
      children,
      onPointerDown,
      side = "bottom",
      size,
      ...props
    },
    ref,
  ) => {
    const { downshift, highlightedItem, isOpen, items, loading } =
      useSelectContext("@optiaxiom/react/SelectContent");

    const [placed, setPlaced] = useState(false);

    return (
      <TransitionGroup open={isOpen}>
        <Portal asChild>
          <ModalLayer asChild>
            <ModalListbox
              asChild
              maxH="sm"
              minW="trigger"
              onPointerDown={(event) => {
                onPointerDown?.(event);
                if (event.defaultPrevented) {
                  return;
                }

                if (
                  event.target instanceof Element &&
                  event.target.closest('[role="option"]')
                ) {
                  return;
                }

                event.preventDefault();
              }}
              provider="popper"
              ref={ref}
              role="dialog"
              size={size}
              {...props}
            >
              <PopperContent align={align} side={side} sideOffset={4}>
                <ListboxItemized
                  highlightedItem={highlightedItem}
                  items={items}
                  itemToKey={(item: SelectOption) => item.value}
                  loading={loading}
                  onPlacedChange={setPlaced}
                  {...downshift.getMenuProps({}, { suppressRefError: !placed })}
                >
                  {children ??
                    ((
                      item: SelectOption,
                      index: number,
                      prevItem: SelectOption | undefined,
                    ) => {
                      const group = item.group;
                      return (
                        <>
                          {shouldShowSeparator(group, prevItem) && (
                            <ListboxSeparator />
                          )}
                          {shouldShowGroup(group, prevItem) && (
                            <ListboxLabel>{group.label}</ListboxLabel>
                          )}
                          <Tooltip content={item.disabledReason}>
                            <SelectRadioItem
                              addonBefore={item.addon}
                              aria-label={item["aria-label"]}
                              description={item.description}
                              index={index}
                              item={item}
                              key={item.value}
                            >
                              {item.label}
                            </SelectRadioItem>
                          </Tooltip>
                        </>
                      );
                    })}
                </ListboxItemized>
              </PopperContent>
            </ModalListbox>
          </ModalLayer>
        </Portal>
      </TransitionGroup>
    );
  },
);

SelectContent.displayName = "@optiaxiom/react/SelectContent";
