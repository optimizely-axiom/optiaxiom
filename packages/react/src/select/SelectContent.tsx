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
  ({ align = "start", children, side = "bottom", size, ...props }, ref) => {
    const { downshift, highlightedItem, isOpen, items, loading } =
      useSelectContext("@optiaxiom/react/SelectContent");

    const [placed, setPlaced] = useState(false);

    let isFirstItem = true;
    let lastGroup: SelectOption["group"] = undefined;
    const shouldShowSeparator = (group: SelectOption["group"]) => {
      const show = !isFirstItem;
      isFirstItem = false;
      return (
        show &&
        group !== lastGroup &&
        (group?.separator || lastGroup?.separator)
      );
    };
    const shouldShowGroup = (
      group: SelectOption["group"],
    ): group is NonNullable<SelectOption["group"]> => {
      const show = group !== lastGroup;
      lastGroup = group;
      return show && !!group && !group?.hidden;
    };

    return (
      <TransitionGroup open={isOpen}>
        <Portal asChild>
          <ModalLayer asChild>
            <ModalListbox
              asChild
              maxH="sm"
              minW="trigger"
              provider="popper"
              ref={ref}
              role="dialog"
              size={size}
              {...props}
            >
              <PopperContent align={align} side={side} sideOffset={5}>
                <ListboxItemized
                  highlightedItem={highlightedItem}
                  items={items}
                  itemToKey={(item: SelectOption) => item.value}
                  loading={loading}
                  onPlacedChange={setPlaced}
                  {...downshift.getMenuProps({}, { suppressRefError: !placed })}
                >
                  {children ??
                    ((item: SelectOption, index) => {
                      if (index === 0) {
                        isFirstItem = true;
                        lastGroup = undefined;
                      }

                      const group = item.group;
                      return (
                        <>
                          {shouldShowSeparator(group) && <ListboxSeparator />}
                          {shouldShowGroup(group) && (
                            <ListboxLabel>{group.label}</ListboxLabel>
                          )}
                          <Tooltip content={item.disabledReason}>
                            <SelectRadioItem
                              addonBefore={item.addon}
                              aria-label={item["aria-label"]}
                              description={item.description}
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
